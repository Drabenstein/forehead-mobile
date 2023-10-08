import React from "react";
import { Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";

const CustomButton = ({
  onPress,
  color = "black",
  title = "Save",
  loading = false,
  disabled = false,
}) => {
  return (
    <Pressable
      style={[
        styles.button,
        { backgroundColor: color, opacity: disabled ? 0.4 : 1.0 },
      ]}
      onPress={onPress}
      disabled={disabled}
      android_ripple={{ color: "#d3d3d3" }}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default CustomButton;
