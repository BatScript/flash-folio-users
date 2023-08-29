import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import React from "react";

const LoadingDialog = ({ isOpen, onClose }) => {
  return (
    <Modal size={"xs"} isCentered isOpen={isOpen}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent maxWidth={"max-content"} padding={"40px"}>
        <ModalBody textAlign={"center"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoadingDialog;
