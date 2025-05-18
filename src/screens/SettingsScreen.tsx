// SettingsScreen.js

import React from 'react';
import { View, Text, Switch, SafeAreaView, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleUnit, setSelectedCategories } from './redux/SettingSlice';
import { PRIMARY_COLOR } from './Utils/utils';

const SettingsScreen = () => {
  const unit = useSelector(state => state.settings.unit);
  const categories = useSelector(state => state.settings.categories);
  const selectedCategories = useSelector(state => state.settings.selectedCategories);
  const dispatch = useDispatch();

  const toggleCategory = (category: any) => {
    const updated = selectedCategories.includes(category) ? [] : [category];
    dispatch(setSelectedCategories(updated));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.heading}>SETTINGS</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Temperature Unit</Text>
          <View style={styles.toggleRow}>
            <Text style={styles.label}>{unit === 'metric' ? 'Celsius' : 'Fahrenheit'}</Text>
            <Switch
              value={unit === 'imperial'}
              onValueChange={() => dispatch(toggleUnit())}
              thumbColor="#fff"
              trackColor={{ true: PRIMARY_COLOR }}
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>News Categories</Text>
          <FlatList
            data={categories}
            scrollEnabled={false}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => toggleCategory(item)} style={styles.categoryItem}>
                <Text style={[styles.categoryText, selectedCategories.includes(item) && styles.selectedCategory]}>
                  {selectedCategories.includes(item) ? '✓ ' : ''}{item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fe',
  },
  scrollView: {
    padding: 16,
    paddingBottom: 32,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  label: {
    fontSize: 15,
    color: '#333',
  },
  categoryItem: {
    paddingVertical: 8,
  },
  categoryText: {
    fontSize: 15,
    color: '#333',
  },
  selectedCategory: {
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
  },
  supportItem: {
    paddingVertical: 10,
  },
  supportText: {
    fontSize: 15,
    color: '#333',
  },
  logoutButton: {
    marginTop: 10,
  },
  gradient: {
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
