import React from 'react';
import IRegisterFormValues from 'interfaces/form/IRegisterFormValues';
import { FormikProps, Formik } from 'formik';
import TextInput from './form/TextInput';
import * as yup from 'yup';
import ILoginScreenProps from 'interfaces/screens/ILoginScreenProps';
import { inject, observer } from 'mobx-react';
import Button from './form/Button';
import { FormFrame } from './Frame';

interface IRegisterProps extends ILoginScreenProps {
  onSubmitComplete: (values:IRegisterFormValues) => void;
}

const initialValues: IRegisterFormValues = {
  username: '',
  name:'',
}

const validationSchema:yup.ObjectSchema = yup.object({
  username:yup.string().required('아이디를 입력해주세요.'),
});

const FormRender = (props:FormikProps<IRegisterFormValues>) => {
  const {values, handleChange, setFieldTouched, touched, errors, submitForm} = props;
  return (
    <>
      <div className='row'>
        <TextInput
          name='username'
          type='text'
          placeholder='아이디'
          value={values.username}
          onChange={handleChange}
          onBlur={()=>{setFieldTouched('username', true)}}
          onKeyPress={(key:any)=>{
            if(key.which === 13)
              submitForm();
          }}
        />
      </div>
      {
        touched.username && errors.username &&
          <div className='error'>
            {errors.username}
          </div>
      }
      <div className='row'>
        <TextInput
          name='name'
          type='text'
          placeholder='이름'
          value={values.name}
          onChange={handleChange}
          onBlur={()=>{setFieldTouched('name', true)}}
          onKeyPress={(key:any)=>{
            if(key.which === 13)
              submitForm();
          }}
        />
      </div>
      {
        touched.name && errors.name &&
          <div className='error'>
            {errors.name}
          </div>
      }
      <div className='row row-submit'>
        <Button type='submit' onClick={submitForm}>전송</Button>
      </div>
    </>
  )
}

const Register = (props:IRegisterProps) => {
  const {screenLogin:screenModel} = props;
  if(!screenModel)
    throw new Error('no screen model found');
  return (
    <FormFrame>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values:IRegisterFormValues) => {
          try {
            await screenModel.register(values);
            props.onSubmitComplete(values);
          } catch(e) {
            alert('다시 시도해주세요.');
          }
        }}
        render={(props:FormikProps<IRegisterFormValues>)=><FormRender {...props}/>}
      />
    </FormFrame>
  )
}

export default inject('screenLogin', 'loginInfo')(observer(Register));