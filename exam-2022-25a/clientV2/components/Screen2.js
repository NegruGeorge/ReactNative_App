import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

function Screen2({ productsFilter, name }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Screen2 2 2 2 </Text>

      <Button
        title="Go to Screen 1 1 1"
        onPress={() => navigation.goBack()}
      ></Button>

      {productsFilter}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Screen2;
