import React, { FC } from 'react';
import IComponentProps from 'interfaces/IComponentProps';
import { FrameCenter } from 'components/Frame';
import image from 'assets/img/notFound/0.svg';

const NotFound:FC<IComponentProps> = (props:IComponentProps) => {
  return (
    <FrameCenter className='msg-frame'>
      <img className='title-img' src={image} alt='logo'/>
      <div className='msg'>
        잘못된 페이지입니다.
      </div>
    </FrameCenter>
  )
}
export default NotFound;