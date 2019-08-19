import React, { FC } from 'react';
import IChatRoomScreenProps from 'interfaces/screens/IChatRoomScreenProps';
import styled from 'styled-components';
import { applyFlexbox } from 'style/mixins';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import { Formik, FormikProps, FormikActions } from 'formik';
import TextInput from 'components/form/TextInput';
import Button from 'components/form/Button';
import * as yup from 'yup';
import ISendChatFormValues from 'interfaces/form/ISendChatFormValues';
import Icon from 'components/Icon';
import theme from 'style/theme';

interface ISendChatProps extends IChatRoomScreenProps{};

const initialValues:ISendChatFormValues = {
  content: '',
};

const validationSchema:yup.ObjectSchema = yup.object({
  content: yup.string().required(),
});

const FormFrame = styled.div`
  width:100%;
  height:4em;
  background-color: ${theme.sendChat};
  ${applyFlexbox('row', 'flex-start', 'stretch')};
  .row {
    ${applyFlexbox('row', 'flex-start', 'stretch')};
    min-width:5em;
  }
  .row:not(.submit):not(.send-image-btn-frame) {
    flex:1;
    > * {
      width: 100%;
    }
  }
  input[type='text'] {
    border-bottom:none;
  }
  .send-image-btn-frame {
    min-width:4em;
    border-right:1px solid ${theme.gray9};
  }
  .btn-send-image {
    width:100%;
    height:100%;
    ${applyFlexbox('row','center','center')};
    &+input[type='file'] {
      display:none;
    }
    &:hover {
      background-color:${theme.color3};
    }
    &:active {
      transform:translateY(2px);
    }
  }
`

const FormRender = (props:FormikProps<ISendChatFormValues>) => {
const {values, handleChange, submitForm} = props;

  return (
    <>
      <div className='row'>
        <TextInput type='text' name='content' value={values.content} placeholder='메시지를 입력하세요.' onChange={handleChange}
          onKeyPress={(key:any)=>{
            if(key.which === 13)
              submitForm();
          }}
        />
      </div>
      <div className='row submit'>
        <Button disabled={!values.content} type='submit' onClick={submitForm}>
          <Icon name='send' />
        </Button>
      </div>
    </>
  )
}

const SendChat:FC<ISendChatProps> = (props:ISendChatProps) => {
  const {screenChatRoom:screenModel} = props;
  if(!screenModel)
    throw new Error('screen model not found');
  return (
    <FormFrame>
      <div className='row send-image-btn-frame'>
        <label className='btn-send-image' htmlFor='send-image'>
          <Icon name='image'/>
        </label>
        <input type='file' id='send-image' name='image' accept="image/*"
          onChange={(e:any)=>{
            const {files} = e.target;
            if(!!files[0])
              screenModel.sendImage(files[0]);
          }}
        />
      </div>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, {resetForm}:FormikActions<ISendChatFormValues>)=>{
          screenModel.sendMessage(values);
          resetForm();
          
        }}
        render={(props)=><FormRender {...props} />}
      />
    </FormFrame>
  )
}

export default inject('screenChatRoom')(observer(SendChat));