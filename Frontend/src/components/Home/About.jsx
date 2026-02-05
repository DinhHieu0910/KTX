import { Container, Typography } from '@mui/material';
import React from 'react';

const About = () => {
  return (
    <Container
      id="About"
      className="!bg-none xl:bg-about !flex flex-col items-center w-full justify-center xl:items-start"
    >
      <Typography className="second-title text-center" component="h4" variant="h4">
        Chào mừng đến KTX
      </Typography>
      <Typography component="p">
        Ký túc xá là ngôi nhà thứ hai lý tưởng để học sinh bắt đầu hành trình trưởng thành tại trường nội trú. 
        Với vị trí ngay trong khuôn viên, cơ sở vật chất hiện đại cùng chế độ sinh hoạt điều độ và khoa học, ký túc xá không chỉ đảm bảo sự an toàn tuyệt đối mà còn tạo dựng môi trường học tập lành mạnh. 
        Tại đây, các em được rèn luyện tính tự lập, kỹ năng sống và sự gắn kết bè bạn, giúp các em yên tâm trau dồi tri thức, sẵn sàng bản lĩnh cho những mục tiêu xa hơn trong tương lai.
      </Typography>
    </Container>
  );
};

export default About;
