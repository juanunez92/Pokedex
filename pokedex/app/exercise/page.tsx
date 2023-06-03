"use client";

import { ChakraProvider } from "@chakra-ui/react";
import Counter from "./button";


const Exercise = () => {
    function nada(){
            return 4;
    }


  return (
    <>
      <ChakraProvider>
        <Counter initValue={1} initSum={1} initF={nada}/>
        <Counter initValue={5} initSum={5} initF={nada}/>
      </ChakraProvider>
    </>
  );
};

export default Exercise;
