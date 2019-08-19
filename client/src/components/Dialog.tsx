import React, { FC } from 'react';
import IComponentProps from 'interfaces/IComponentProps';
import { DialogFrame } from './Frame';
import Button from './form/Button';
import Icon from './Icon';

interface IDialogProps extends IComponentProps {
  visible: boolean;
  onClose: ()=>void;
}

const Dialog:FC<IDialogProps> = (props:IDialogProps) => {
  return (
    <DialogFrame className={props.visible? 'visible':'hidden'}>
      <div className='dialog-frame'>
        <Button className='btn-close'
          onClick={props.onClose}
        >
          <Icon name='close'/>
        </Button>
        {props.children}
      </div>
    </DialogFrame>
  )
}

export default Dialog;