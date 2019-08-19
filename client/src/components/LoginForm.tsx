import React, {FC} from 'react'
import IComponentProps from 'interfaces/IComponentProps';
import TextInput from './form/TextInput';
import {Formik, FormikProps} from 'formik';
import * as yup from 'yup';
import Button from './form/Button';
import ILoginFormValue from 'interfaces/form/ILoginFormValue';
import { FormFrame } from './Frame';
import styled from 'styled-components';

interface ILoginForm extends IComponentProps {
  onSubmit:(values:ILoginFormValue)=>void;
}

const initialValues:ILoginFormValue = {
  username: '',
}

const validationSchema:yup.ObjectSchema = yup.object({
  username: yup.string().required('아이디를 입력해주세요.'),
})

const FormRender = (props:FormikProps<ILoginFormValue>) => {
  const {values, handleChange, setFieldTouched, touched, errors, submitForm} = props;
  return (
    <>
      <div className='row'>
        <TextInput 
          type='text'
          name='username'
          placeholder='아이디'
          value={values.username}
          onChange={handleChange}
          onBlur={()=>{setFieldTouched('username',true);}}
          onKeyPress={(key:any)=>{
            if (key.which === 13)
              submitForm();
          }}
        />
      </div>
      {
        touched.username && errors.username &&
        <div className='error'>{errors.username}</div>
      }
      <div className='row row-submit'>
        <Button 
          type='submit'
          className='btn-submit'
          onClick={submitForm}
          icon='arrow_forward'
        >
          로그인
        </Button>
      </div>
    </>
  )
}

const LoginForm:FC<ILoginForm> = (props:ILoginForm) => {
  return (
    <FormFrame>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={props.onSubmit}
        render={(props:FormikProps<ILoginFormValue>)=> <FormRender {...props}/>}
      />
    </FormFrame>
  )
}

export default LoginForm;