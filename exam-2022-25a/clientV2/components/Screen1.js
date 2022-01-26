import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
function Screen1({ submitForm, productsText, name }) {
  const navigation = useNavigation();

  const [nume, setNume] = useState("");
  const [tip, setTip] = useState("");
  const [pret, setPret] = useState("");
  const [cantitate, setCantitate] = useState("");
  const [discount, setDiscount] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Button
          title="Go to Screen2 "
          onPress={() => navigation.navigate("Screen2")}
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
