import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera as Cam, PermissionStatus } from 'expo-camera';

// import { Container } from './styles';

const Camera: React.FC = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [errCompatible, setErrCompatible] = useState(false);
  const [type, setType] = useState(Cam.Constants.Type.back);

  useEffect(() => {
    (async () => {
      if(await Cam.isAvailableAsync()){
        try {
          const { status } = await Cam.requestPermissionsAsync();
          console.log(status);
          setHasPermission(status === PermissionStatus.GRANTED);
        } catch(err) {
          setErrCompatible(true);
        }
      }
    })();
  }, []);

  if(errCompatible){
    return (
      <View  style={{ flex: 1 }}>
        <Cam style={{ flex: 11.5 }} />
        <Text style={{ flex: 0.5, fontSize: 18, marginTop: 4, color: '#000', backgroundColor: 'c6c6c6', alignItems: 'center', justifyContent: 'center' }}>Unable to access camera properly!</Text>
      </View>
    )
  }

  if (hasPermission === null) {
    return (
      <View style={styles.err}>
        <Text>No access to camera!</Text>
      </View>
    );
  }

  if (!hasPermission) {
    return ( 
      <View style={styles.msg}>
        <Text>No permission to camera!</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Cam style={{ flex: 1 }} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Cam.Constants.Type.back
                  ? Cam.Constants.Type.front
                  : Cam.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Cam>
    </View>
  );
}

const styles = StyleSheet.create({
  msg: { 
    flex: 1,
    backgroundColor: '#c6c6c6',
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24
  },
  err: { 
    flex: 1,
    backgroundColor: '#f55',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24
  }
});

export default Camera;