import React, { useState, useEffect } from "react";

import { StyleSheet, Text, View } from "react-native";

import Screen1 from "./components/Screen1";
import Screen2 from "./components/Screen2";

import * as SQLite from "expo-sqlite";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import axios from "axios";

const db = SQLite.openDatabase("database.db");

const Stack = createNativeStackNavigator();

export default function App() {
  const [products, setProducts] = useState([]);
  const [productsDb, setProductDb] = useState([]);

  const [productsFilter, setProductsFilter] = useState([]);

  const [productsText, setProductsText] = useState([]);
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

  const getProducts_with_filter = async () => {
    try {
      let res = await axios.get("http://192.168.100.6:2025/products");

      let tip_pret_ieftin = {};
      res.data.forEach((el) => {
        let tips = el.tip;

        if (tip_pret_ieftin[tips] == undefined) {
          tip_pret_ieftin[tips] = el.pret;
        } else if (tip_pret_ieftin[tips] > el.pret) {
          tip_pret_ieftin[tips] = el.pret;
        }
      });

      console.log("sss");
      console.log(tip_pret_ieftin);
      let arr = [];
      for (const key in tip_pret_ieftin) {
        arr.push(
          <Text>
            TIP: {key} pretul cel mai mic: {tip_pret_ieftin[key]}
          </Text>
        );
      }
      setProductsFilter(arr);
    } catch (err) {
      console.log(err);
    }
  };

  let submitForm = async (nume, tip, cantitate, pret, discount) => {
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

  // useEffect(() => {
  //   console.log(db);
  //   createTable();
  //   get_elements_from_db();
  // }, []);

  useEffect(() => {
    getProducts();
    getProducts_with_filter();
  }, [produsAdaugatSesiune]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Screen1">
        <Stack.Screen name="Screen1">
          {(props) => (
            <Screen1
              submitForm={submitForm}
              productsText={productsText}
              name="Screen1"
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Screen2">
          {(props) => (
            <Screen2 productsFilter={productsFilter} name="Screen2" />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>

    // <View style={styles.container}>
    //   <Screen1 />
    // </View>
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
