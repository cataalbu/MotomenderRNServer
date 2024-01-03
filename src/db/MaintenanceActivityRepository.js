import AsyncStorage from '@react-native-async-storage/async-storage';

class MaintenanceActivityRepository {
  async getAllActivities() {
    try {
      const activities = await AsyncStorage.getItem('@activities');
      return activities != null ? JSON.parse(activities) : [];
    } catch (err) {
      throw err;
    }
  }

  async addActivity(activity) {
    try {
      const activitiesItems = await AsyncStorage.getItem('@activities');
      const activities =
        activitiesItems != null ? JSON.parse(activitiesItems) : [];
      activities.push(activity);
      await AsyncStorage.setItem('@activities', JSON.stringify(activities));
    } catch (error) {
      console.error('Error adding maintenance activity:', error);
      throw error;
    }
  }

  async updateActivity(activity) {
    try {
      const activitiesItems = await AsyncStorage.getItem('@activities');
      const activities =
        activitiesItems != null ? JSON.parse(activitiesItems) : [];
      const index = activities.findIndex(item => item.id === activity.id);
      activities[index] = activity;
      await AsyncStorage.setItem('@activities', JSON.stringify(activities));
    } catch (error) {
      console.error('Error updating maintenance activity:', error);
      throw error;
    }
  }
  async deleteActivity(id) {
    try {
      const activitiesItems = await AsyncStorage.getItem('@activities');
      const activities =
        activitiesItems != null ? JSON.parse(activitiesItems) : [];
      const index = activities.findIndex(item => item.id === id);
      activities.splice(index, 1);
      await AsyncStorage.setItem('@activities', JSON.stringify(activities));
    } catch (error) {
      console.error('Error deleting maintenance activity:', error);
      throw error;
    }
  }
  async addOfflineActivity(activity) {
    try {
      const activitiesItems = await AsyncStorage.getItem('@offlineActivities');
      const activities =
        activitiesItems != null ? JSON.parse(activitiesItems) : [];

      const onlineActivitiesItems = await AsyncStorage.getItem('@activities');
      const onlineActivities =
        onlineActivitiesItems != null ? JSON.parse(onlineActivitiesItems) : [];

      let id = Math.max(
        ...onlineActivities.map(a => a.id),
        ...activities.map(a => a.id),
        0,
      );

      id++;

      activity.id = id;
      activities.push(activity);
      await AsyncStorage.setItem(
        '@offlineActivities',
        JSON.stringify(activities),
      );
    } catch (error) {
      console.error('Error adding offline maintenance activity:', error);
      throw error;
    }
  }
  async getAllOfflineActivities() {
    try {
      const activities = await AsyncStorage.getItem('@offlineActivities');
      return activities != null ? JSON.parse(activities) : [];
    } catch (err) {
      throw err;
    }
  }
  async deleteAllOfflineActivities() {
    try {
      await AsyncStorage.removeItem('@offlineActivities');
    } catch (err) {
      throw err;
    }
  }
  async setAllActivities(activities) {
    try {
      await AsyncStorage.setItem('@activities', JSON.stringify(activities));
    } catch (err) {
      throw err;
    }
  }
}

export default MaintenanceActivityRepository;
