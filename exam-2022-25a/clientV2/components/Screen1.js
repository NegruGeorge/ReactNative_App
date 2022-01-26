import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Alert,
} from "react-native";

import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
function Screen1({ submitForm, productsText, name }) {
  const navigation = useNavigation();

  const [nume, setNume] = useState("");
  const [tip, setTip] = useState("");
  const [pret, setPret] = useState("");
  const [cantitate, setCantitate] = useState("");
  const [discount, setDiscount] = useState("");

  const createAlertAdd = () => {
    Alert.alert("Adauga Element", "Adauga element in lista", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Button
          title="Go to Screen2 "
          onPress={() => {
            navigation.navigate("Screen2");
          }}
        ></Button>

        <View>
          <TextInput
            style={styles.formInput1}
            placeholder="nume"
            onChangeText={setNume}
          ></TextInput>

          <TextInput
            style={styles.formInput}
            placeholder="tip"
            onChangeText={setTip}
          ></TextInput>

          <TextInput
            style={styles.formInput}
            placeholder="cantitate produs"
            onChangeText={setCantitate}
          ></TextInput>

          <TextInput
            style={styles.formInput}
            placeholder="pret"
            onChangeText={setPret}
          ></TextInput>

          <TextInput
            style={styles.formInput}
            placeholder="discount"
            onChangeText={setDiscount}
          ></TextInput>

          <Button
            title="ADAUGA PRODUS"
            onPress={() => {
              submitForm(nume, tip, cantitate, pret, discount);
              createAlertAdd();
            }}
          ></Button>
        </View>

        <Text>SHOW PRODUCTS:</Text>

        {productsText}
      </ScrollView>
    </SafeAreaView>
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
export default Screen1;
