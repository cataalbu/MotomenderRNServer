import AsyncStorage from '@react-native-async-storage/async-storage';

class MotorcycleRepository {
  async getAllMotorcycles() {
    try {
      const motorcycles = await AsyncStorage.getItem('@motorcycles');
      return motorcycles != null ? JSON.parse(motorcycles) : [];
    } catch (err) {
      throw err;
    }
  }
  async addMotorcycle(motorcycle) {
    try {
      const motorcyclesItems = await AsyncStorage.getItem('@motorcycles');
      const motorcycles =
        motorcyclesItems != null ? JSON.parse(motorcyclesItems) : [];
      motorcycles.push(motorcycle);
      await AsyncStorage.setItem('@motorcycles', JSON.stringify(motorcycles));
    } catch (error) {
      console.error('Error adding motorcycle:', error);
      throw error;
    }
  }

  async updateMotorcycle(motorcycle) {
    try {
      const motorcyclesItems = await AsyncStorage.getItem('@motorcycles');
      const motorcycles =
        motorcyclesItems != null ? JSON.parse(motorcyclesItems) : [];
      const index = motorcycles.findIndex(item => item.id === motorcycle.id);
      motorcycles[index] = motorcycle;
      await AsyncStorage.setItem('@motorcycles', JSON.stringify(motorcycles));
    } catch (error) {
      console.error('Error updating motorcycle:', error);
      throw error;
    }
  }

  async deleteMotorcycle(id) {
    try {
      const motorcyclesItems = await AsyncStorage.getItem('@motorcycles');
      const motorcycles =
        motorcyclesItems != null ? JSON.parse(motorcyclesItems) : [];
      const index = motorcycles.findIndex(item => item.id === id);
      motorcycles.splice(index, 1);
      await AsyncStorage.setItem('@motorcycles', JSON.stringify(motorcycles));
    } catch (error) {
      console.error('Error deleting motorcycle:', error);
      throw error;
    }
  }

  async addOfflineMotorcycle(motorcycle) {
    try {
      const motorcyclesItems = await AsyncStorage.getItem(
        '@offlineMotorcycles',
      );
      const motorcycles =
        motorcyclesItems != null ? JSON.parse(motorcyclesItems) : [];

      const onlineMotorcyclesItems = await AsyncStorage.getItem('@motorcycles');
      const onlineMotorcycles =
        onlineMotorcyclesItems != null
          ? JSON.parse(onlineMotorcyclesItems)
          : [];
      console.log(onlineMotorcycles.length + 1, motorcycles.length + 1);
      // get the maximal id between motorcycles and offline motorcycles
      let id = Math.max(
        ...onlineMotorcycles.map(motorcycle => motorcycle.id),
        ...motorcycles.map(motorcycle => motorcycle.id),
        0,
      );

      id++;

      motorcycles.push({id, ...motorcycle});
      await AsyncStorage.setItem(
        '@offlineMotorcycles',
        JSON.stringify(motorcycles),
      );
      return id;
    } catch (error) {
      console.error('Error adding motorcycle:', error);
      throw error;
    }
  }

  async getAllOfflineMotorcycles() {
    try {
      const motorcycles = await AsyncStorage.getItem('@offlineMotorcycles');
      return motorcycles != null ? JSON.parse(motorcycles) : [];
    } catch (err) {
      throw err;
    }
  }

  async setAllMotorcycles(motorcycles) {
    try {
      await AsyncStorage.setItem('@motorcycles', JSON.stringify(motorcycles));
    } catch (error) {
      console.error('Error setting motorcycles:', error);
      throw error;
    }
  }
  async deleteAllOflfineMotorcycles() {
    try {
      await AsyncStorage.removeItem('@offlineMotorcycles');
    } catch (error) {
      console.error('Error deleting motorcycles:', error);
      throw error;
    }
  }
}

export default MotorcycleRepository;
