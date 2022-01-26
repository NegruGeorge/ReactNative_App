import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";

// import Screen1 from "./components/Screen1";
import Screen2 from "./components/Screen2";

import axios from "axios";

import * as SQLite from "expo-sqlite";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const db = SQLite.openDatabase("database.db");

const Stack = createNativeStackNavigator();

export default function App() {
  const [products, setProducts] = useState([]);
  const [productsDb, setProductDb] = useState([]);

  const [productsText, setProductsText] = useState([]);

  const [nume, setNume] = useState("");
  const [tip, setTip] = useState("");
  const [pret, setPret] = useState("");
  const [cantitate, setCantitate] = useState("");
  const [discount, setDiscount] = useState("");

  const [produsAdaugatSesiune, setProdusAdaugatSesiune] = useState(0);

  const getProducts = async () => {
    try {
      let res = await axios.get("http://192.168.100.6:2025/products");
      setProducts(res.data);
      let arr = [];
      res.data.forEach((el) => {
        arr.push(
          <Text>
            id:{el.id} nume:{el.nume} tip:{el.tip} cantitate:{el.cantitate}{" "}
            pret:{el.pret}
          </Text>
        );
      });
      setProductsText(arr);
      // console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  let submitForm = async () => {
    console.log(
      "form:" + nume + " " + tip + " " + cantitate + " " + pret + " " + discount
    );

    try {
      let res = await axios.post("http://192.168.100.6:2025/product", {
        nume: nume,
        tip: tip,
        cantitate: cantitate,
        pret: pret,
        discount: discount,
      });

      console.log(res.data);
      console.log("success");

      let total_Adaugate_sesiune = produsAdaugatSesiune;
      total_Adaugate_sesiune += 1;
      setProdusAdaugatSesiune(total_Adaugate_sesiune);
    } catch (err) {
      console.log("errr");
      console.log(err);
    }
  };

  const createTable = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table Exam" +
            "(id integer, nume text, tip text, cantitate text , pret text, discount text)"
        );
      },
      (err) => {
        console.log(err.message);
        console.log("eroare in db");
      }
    );

    console.log("am creat DB ul");
  };

  const get_elements_from_db = () => {
    let newArr = [];
    db.transaction((tx) => {
      tx.executeSql("select * from exam", [], (_, { rows: { _array } }) => {
        _array.forEach((el) => {
          newArr = [...newArr, el];
        });

        console.log(newArr);
      });
    });
  };

  const addAsset = (item) => {
    let ok = 0;

    db.transaction(
      (tx) => {
        tx.executeSql(
          `INSERT INTO EXAM (id,nume,tip,cantitate,pret,discount)  values 
          ('${item.id}','${item.nume}', '${item.tip}', '${item.cantitate}','${item.pret}','${item.discount}')
          `
        );
      },
      (error) => {
        console.log(error);
      }
    );
    console.log("item adaugat");
    // get_elements_from_db()
  };

  useEffect(() => {
    console.log(db);
    createTable();
    get_elements_from_db();
  }, []);

  useEffect(() => {
    getProducts();
  }, [produsAdaugatSesiune]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <SafeAreaView style={styles.container}>
          <ScrollView>
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
                  submitForm();
                }}
              ></Button>
            </View>

            <Text>SHOW PRODUCTS:</Text>

            {productsText}

            <StatusBar style="auto" />
          </ScrollView>
        </SafeAreaView>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  formInput: {
    borderWidth: 2,
    margin: 10,
    borderColor: "blue",
  },
  formInput1: {
    borderWidth: 2,
    margin: 10,
    marginTop: 60,
    borderColor: "blue",
  },
});
