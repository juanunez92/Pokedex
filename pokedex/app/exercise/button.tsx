"use client";
import { Box, Button, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface Props {
  initValue:number;
  initSum:number;
  initF:()=>number;
}

function Counter({initValue,initSum, initF}:Props) {

  const [value, setValue] = useState(initValue);

  const pressButton = () => {
    const result = value;
    setValue(value + initSum);
  
  };
  function onPress(){
    const r = initF();
    setValue(r + value);
  }

  return (
    <>
      <Button colorScheme="red" onClick={pressButton} onMouseEnter={onPress}>
        {value}
      </Button>
    </>
  );
};

export default Counter;
