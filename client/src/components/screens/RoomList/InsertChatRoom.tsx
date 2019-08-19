import React, { FC } from 'react';
import IRoomListScreenProps from 'interfaces/screens/IRoomListScreenProps';
import { inject, observer } from 'mobx-react';
import { FormFrame } from 'components/Frame';
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';
import TextInput from 'components/form/TextInput';
import IInsertChatRoomFormValues from 'interfaces/form/IInsertChatRoomFormValues';
import Button from 'components/form/Button';

interface IInsertChatRoomProps extends IRoomListScreenProps {
  onSubmitComplete:()=>void;
};

const initialValues:IInsertChatRoomFormValues= {
  title: ''
}

const validationSchema:yup.ObjectSchema = yup.object({
  title: yup.string().required('제목을 입력해주세요.'),
});

const FormRender = (props:FormikProps<IInsertChatRoomFormValues>) => {
  const {values, handleChange, setFieldTouched, touched, errors, submitForm} = props;
  return (
    <>
      <div className='row'>
        <TextInput
          name='title'
          type='text'
          placeholder='방제목'
          value={values.title}
          onChange={handleChange}
          onBlur={()=>{setFieldTouched('title', true)}}
          onKeyPress={(key:any)=>{
            if(key.which === 13)
              submitForm();
          }}
        />
      </div>
      {
        touched.title && errors.title &&
          <div className='error'>
            {errors.title}
          </div>
      }
      <div className='row row-submit'>
        <Button type='submit' onClick={submitForm}>전송</Button>
      </div>
    </>
  )
}

const InsertChatRoom:FC<IInsertChatRoomProps> = (props:IInsertChatRoomProps) => {
  const {screenRoomList: screenModel} = props;
  if(!screenModel)
    throw new Error('no screen model found');
  return (
    <>
      <h3 className='title'>대화방 생성</h3>
      <FormFrame>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values:IInsertChatRoomFormValues)=>{
            if(!screenModel)
              throw new Error('no screen model found');
            await screenModel.insertRoom(values);
            props.onSubmitComplete();
          }}
          render={(props)=><FormRender {...props}/>}
        />
      </FormFrame>
    </>
  )
}

export default inject('screenRoomList')(observer(InsertChatRoom));