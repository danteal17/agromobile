import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Camera, CameraType } from 'expo-camera'; // Importación correcta de Camera

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const cameraRef = useRef<Camera | null>(null);  // Referencia a Camera

  useEffect(() => {
    (async () => {
      // Pedir permisos para la cámara
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePhoto = async () => {
    if (!cameraRef.current) return;

    // Tomar la foto con la referencia
    const photo = await cameraRef.current.takePictureAsync();
    console.log(photo.uri);
  };

  if (hasPermission === null) return <Text>Solicitando permisos...</Text>;
  if (hasPermission === false) return <Text>Permiso denegado</Text>;

  return (
    <View style={styles.container}>
      {/* La referencia y tipo de Camera están correctamente definidos */}
      <Camera ref={cameraRef} style={styles.camera}>
        <Button title="Tomar foto" onPress={takePhoto} />
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
});
