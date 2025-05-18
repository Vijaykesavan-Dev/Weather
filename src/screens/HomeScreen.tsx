import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Linking,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as Location from 'expo-location';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchWeather } from './redux/weatherSlice';
import { fetchNews } from './redux/newsSlice';
import {  PRIMARY_COLOR } from './Utils/utils';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const weather = useAppSelector((state) => state.weather);
  const news = useAppSelector((state) => state.news);
  const unit = useAppSelector((state) => state.settings.unit);
  const selectedCategories = useAppSelector((state) => state.settings.selectedCategories);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      let location = await Location.getCurrentPositionAsync({});
      try {
        const resultAction = await dispatch(
          fetchWeather({
            lat: location.coords.latitude,
            lon: location.coords.longitude,
            unit,
          })
        );
        if (fetchWeather.rejected.match(resultAction)) {
          console.error('Weather fetch failed:', resultAction.error);
        }
      } catch (err) {
        console.error('Weather fetch error:', err);
      }
    })();
  }, [dispatch, unit]);

  const getMoodFromTemp = (temp: number) => {
    if (unit === 'metric') {
      if (temp <= 10) return 'depressing';
      if (temp >= 30) return 'fear';
      return 'happy';
    } else {
      if (temp <= 50) return 'depressing';
      if (temp >= 86) return 'fear';
      return 'happy';
    }
  };
  useEffect(() => {
    if (weather.data) {
      const temp = weather.data?.list?.[0]?.main?.temp;
      const mood = getMoodFromTemp(temp);
      const categoriesQuery = selectedCategories.join(',');

      dispatch(fetchNews({ keyword: `${mood} ${categoriesQuery}` }));
    }
  }, [weather.data, dispatch, selectedCategories]);

  if (weather.status === 'loading' || news.status === 'loading') {
    return <ActivityIndicator size="large" />;
  }

  const forecastList = weather?.data?.list || [];
  const currentWeather = forecastList[0];
  const dailyForecast = forecastList
    .filter((item: any) => item.dt_txt.includes('12:00:00'))
    .slice(0, 5);

  const Heat = unit === 'metric' ? 'Celsius' : 'Fahrenheit';

  const getWeatherIcon = (icon: any) =>
    `https://openweathermap.org/img/wn/${icon}@4x.png`;

  return (
    <SafeAreaView style={{ padding: 16 }}>
      <ScrollView>
        {forecastList.length > 0 && (
          <View style={styles.weatherSection}>
            <View style={styles.currentWeatherBox}>
              <Text style={styles.cityText}>{weather?.data?.city?.name}</Text>
              <Image
                source={{ uri: getWeatherIcon(currentWeather.weather[0].icon) }}
                style={styles.currentIcon}
              />
              <Text style={styles.tempText}>{Math.round(currentWeather.main.temp)}°</Text>
              <Text style={styles.conditionText}>{currentWeather.weather[0].main}</Text>
              <Text style={styles.unitText}>{Heat}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.forecastTitle}>Forecast</Text>
              <Text style={styles.forecastTitle}>Next 5 Days</Text>
            </View>
            <FlatList
              data={dailyForecast}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 10 }}
              renderItem={({ item }) => (
                <View style={styles.forecastCard}>
                  <Text style={styles.cardDate}>{item.dt_txt.split(' ')[0]}</Text>
                  <Image
                    source={{ uri: getWeatherIcon(item.weather[0].icon) }}
                    style={styles.cardIcon}
                  />
                  <Text style={styles.cardTemp}>
                    {Math.round(item.main.temp)}° {Heat}
                  </Text>
                  <Text style={styles.cardCondition}>
                    {item.weather[0].main}
                  </Text>
                </View>
              )}
            />
          </View>
        )}

        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text style={styles.newsTitle}>News</Text>
            <TouchableOpacity >
              <Text style={styles.newsTitle}>{ }</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={news.articles}
            scrollEnabled={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                <Text
                  onPress={() => Linking.openURL(item.url)}
                  style={styles.newsItem}
                >
                  {item.title}
                </Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  weatherSection: {
    padding: 10,
  },
  currentWeatherBox: {
    backgroundColor: '#91C9E4',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  cityText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  currentIcon: {
    width: 100,
    height: 100,
  },
  tempText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff',
  },
  conditionText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#fff',
  },
  unitText: {
    fontSize: 14,
    color: '#f8f8f8',
  },
  forecastTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  forecastCard: {
    backgroundColor: 'rgba(255,255,255,50)',
    borderRadius: 16,
    padding: 10,
    marginRight: 10,
    width: 120,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#91C9E4'
  },
  cardDate: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardIcon: {
    width: 50,
    height: 50,
  },
  cardTemp: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  cardCondition: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  newsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  newsItem: {
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    marginTop: 5,
    fontSize: 16
  },
  description: {
    color: '#333',
    marginTop: 4,
  },
});

export default HomeScreen;
