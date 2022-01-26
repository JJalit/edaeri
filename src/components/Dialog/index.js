import React from 'react';
import Dialog from 'react-native-dialog';

const AlertModal = ({ visible, description, onCancel, onOk }) => {
  return (
    <Dialog.Container visible={visible}>
      <Dialog.Title>내용</Dialog.Title>
      <Dialog.Description style={{ color: 'black' }}>{description}</Dialog.Description>
      <Dialog.Button label="취소" onPress={onCancel} />
      <Dialog.Button label="확인" onPress={onOk} />
    </Dialog.Container>
  );
};

export default AlertModal;
