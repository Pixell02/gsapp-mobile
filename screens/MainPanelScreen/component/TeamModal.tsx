import React, { useState } from "react";
import { View, Modal, StyleSheet, Button, Alert } from "react-native";
import useCustomPanResponder from "../../../hooks/useCustomPanResponder";
import Title from "../../components/Title";
import Input from "../../components/Input";
import InputData from "../../components/InputData";
import * as ImagePicker from "expo-image-picker";
import RoundedButton from "../../components/RoundedButton";
import { Picker } from "@react-native-picker/picker";
import AddTeam from "./AddTeam";
import EditTeam from "./EditTeam";

interface props {
  isOpen: boolean;
  setIsOpen: () => void;
  teamData: any;
  setTeamData: any;
  isEditOpen: boolean;
  setIsEditOpen: () => void;
}

export default function TeamModal({ isOpen, setIsOpen, teamData, setTeamData, isEditOpen, setIsEditOpen }: props) {
 
  return (
    <>
      {isOpen && (
        <AddTeam isOpen={isOpen} setIsOpen={setIsOpen} teamData={teamData} setTeamData={setTeamData}  />
      )}
      {isEditOpen && (
        <EditTeam isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen} teamData={teamData} setTeamData={setTeamData} />
      )}
    </>
  );
}
