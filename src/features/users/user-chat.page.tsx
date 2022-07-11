/* eslint-disable jsx-a11y/label-has-associated-control */
import { Typography, IconButton, Button, Link } from '@mui/material';
import { AttachFile, PowerSettingsNew } from '@mui/icons-material';
import { useContext, useState } from 'react';
import {
  Container,
  ChatArea,
  TypingArea,
  UserMessageContainer,
  AgentMessageContainer,
  MessageTime,
  MessageDate,
  MessageDateTime,
  TextArea,
  FileInput,
  LogoutContainer,
} from '../../components';
import { UserAuthContext } from '../../services';

export const UserChatPage = () => {
  const { logout } = useContext(UserAuthContext);
  const [text, setText] = useState('');

  return (
    <Container>
      <LogoutContainer>
        <Link href="/login" underline="none">
          <Button
            onClick={() => {
              logout();
            }}
            startIcon={<PowerSettingsNew />}
            variant="text"
          >
            Logout
          </Button>
        </Link>
      </LogoutContainer>
      <ChatArea>
        <UserMessageContainer>
          <Typography mb={2}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque rerum, quidem, sit
            fugiat minus doloribus dolor laboriosam id culpa a quisquam temporibus obcaecati
            voluptatum magnam incidunt ducimus. Iste, dolore dolores!
          </Typography>
          <MessageDateTime>
            <MessageDate variant="caption">July 5, 2022</MessageDate>
            <MessageTime variant="caption">12:01</MessageTime>
          </MessageDateTime>
        </UserMessageContainer>
        <AgentMessageContainer>
          <Typography mb={2}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi quas animi voluptatum
            nam incidunt reiciendis ex. Voluptates ducimus, praesentium, rem ex animi asperiores sit
            error ab in libero, consectetur eius?
          </Typography>
          <MessageDateTime>
            <MessageDate variant="caption">July 5, 2022</MessageDate>
            <MessageTime variant="caption">12:01</MessageTime>
          </MessageDateTime>
        </AgentMessageContainer>
        <UserMessageContainer>
          <Typography mb={2}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid, optio vero dolor ad
            enim fuga quis qui voluptatum! Voluptate eum et blanditiis tenetur ea aliquam hic
            doloribus, aperiam voluptas sint?
          </Typography>
          <MessageDateTime>
            <MessageDate variant="caption">July 5, 2022</MessageDate>
            <MessageTime variant="caption">12:01</MessageTime>
          </MessageDateTime>
        </UserMessageContainer>
        <AgentMessageContainer>
          <Typography mb={2}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium facere rem quos
            fugiat natus, officiis quidem amet excepturi expedita sint neque quas repellat. Ipsum
            vero sequi impedit, aspernatur ducimus repellat!
          </Typography>
          <MessageDateTime>
            <MessageDate variant="caption">July 5, 2022</MessageDate>
            <MessageTime variant="caption">12:01</MessageTime>
          </MessageDateTime>
        </AgentMessageContainer>
        <UserMessageContainer>
          <Typography mb={2}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur perferendis
            voluptatibus, blanditiis reprehenderit et rem quia natus labore iste recusandae
            consequatur nam sit quo placeat? Eaque recusandae odit dignissimos ipsa.
          </Typography>
          <MessageDateTime>
            <MessageDate variant="caption">July 5, 2022</MessageDate>
            <MessageTime variant="caption">12:01</MessageTime>
          </MessageDateTime>
        </UserMessageContainer>
        <AgentMessageContainer>
          <Typography mb={2}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis quam vitae sed cum
            quaerat harum dolorem molestiae aliquid ipsam suscipit ea iusto, et aliquam nam
            laboriosam doloribus molestias a. Sint!
          </Typography>
          <MessageDateTime>
            <MessageDate variant="caption">July 5, 2022</MessageDate>
            <MessageTime variant="caption">12:01</MessageTime>
          </MessageDateTime>
        </AgentMessageContainer>
        <UserMessageContainer>
          <Typography mb={2}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum doloribus animi tenetur
            beatae ipsa repudiandae iusto repellendus qui odio, consequuntur minima officia
            voluptatibus corrupti rem enim iste dolore non sint.
          </Typography>
          <MessageDateTime>
            <MessageDate variant="caption">July 5, 2022</MessageDate>
            <MessageTime variant="caption">12:01</MessageTime>
          </MessageDateTime>
        </UserMessageContainer>
        <AgentMessageContainer>
          <Typography mb={2}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus rem aspernatur cum
            omnis sequi eius illum nostrum dolores beatae voluptate eum debitis cumque illo quos
            recusandae, officiis maxime, sint sapiente!
          </Typography>
          <MessageDateTime>
            <MessageDate variant="caption">July 5, 2022</MessageDate>
            <MessageTime variant="caption">12:01</MessageTime>
          </MessageDateTime>
        </AgentMessageContainer>
        <UserMessageContainer>
          <Typography mb={2}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos vero magni modi
            blanditiis ipsum eveniet quasi doloremque necessitatibus, enim eligendi maxime atque
            fugit eos, corporis tempora dignissimos, a quam. Alias.
          </Typography>
          <MessageDateTime>
            <MessageDate variant="caption">July 5, 2022</MessageDate>
            <MessageTime variant="caption">12:01</MessageTime>
          </MessageDateTime>
        </UserMessageContainer>
        <AgentMessageContainer>
          <Typography mb={2}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur impedit beatae
            obcaecati ad odit labore ullam officia sed maxime, alias voluptates possimus eos nulla a
            expedita sequi saepe rerum sunt.
          </Typography>
          <MessageDateTime>
            <MessageDate variant="caption">July 5, 2022</MessageDate>
            <MessageTime variant="caption">12:01</MessageTime>
          </MessageDateTime>
        </AgentMessageContainer>
        <UserMessageContainer>
          <Typography mb={2}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus dolorem animi iusto
            ut optio perferendis dicta qui officia. Ipsam explicabo et obcaecati tempore, provident
            magni ducimus! Quasi eaque omnis nisi!
          </Typography>
          <MessageDateTime>
            <MessageDate variant="caption">July 5, 2022</MessageDate>
            <MessageTime variant="caption">12:01</MessageTime>
          </MessageDateTime>
        </UserMessageContainer>
        <AgentMessageContainer>
          <Typography mb={2}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem amet tempora enim totam
            quaerat veniam libero ipsa quos repellat dignissimos, eligendi obcaecati consectetur,
            nesciunt beatae neque illum molestiae, odio mollitia.
          </Typography>
          <MessageDateTime>
            <MessageDate variant="caption">July 5, 2022</MessageDate>
            <MessageTime variant="caption">12:01</MessageTime>
          </MessageDateTime>
        </AgentMessageContainer>
        <UserMessageContainer>
          <Typography mb={2}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo modi numquam
            laboriosam iure. Nemo dolorem deserunt minus, aliquid totam eius esse recusandae optio a
            voluptate fugiat voluptas facilis beatae fuga?
          </Typography>
          <MessageDateTime>
            <MessageDate variant="caption">July 5, 2022</MessageDate>
            <MessageTime variant="caption">12:01</MessageTime>
          </MessageDateTime>
        </UserMessageContainer>
        <AgentMessageContainer>
          <Typography mb={2}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas non quis reiciendis. Vero
            sequi animi nisi debitis tempora labore, qui nemo eligendi tempore sit laudantium nulla.
            Laudantium maiores deleniti cumque?
          </Typography>
          <MessageDateTime>
            <MessageDate variant="caption">July 5, 2022</MessageDate>
            <MessageTime variant="caption">12:01</MessageTime>
          </MessageDateTime>
        </AgentMessageContainer>
        <UserMessageContainer>
          <Typography mb={2}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium expedita eveniet
            tempore eum mollitia laboriosam, harum et laborum recusandae quam id, dolorum
            consequatur culpa quaerat, eligendi voluptatum voluptate vero veritatis?
          </Typography>
          <MessageDateTime>
            <MessageDate variant="caption">July 5, 2022</MessageDate>
            <MessageTime variant="caption">12:01</MessageTime>
          </MessageDateTime>
        </UserMessageContainer>
        <AgentMessageContainer>
          <Typography mb={2}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et inventore accusantium ex
            ipsum ea eveniet? Aspernatur deserunt ipsum, quis totam numquam quasi, explicabo, dicta
            tenetur excepturi illum quas cupiditate sed?
          </Typography>
          <MessageDateTime>
            <MessageDate variant="caption">July 5, 2022</MessageDate>
            <MessageTime variant="caption">12:01</MessageTime>
          </MessageDateTime>
        </AgentMessageContainer>
        <UserMessageContainer>
          <Typography mb={2}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus quisquam,
            dignissimos aliquid odit ullam ut optio possimus ea voluptates dolor sunt nobis error
            numquam neque excepturi voluptatem illo esse quia!
          </Typography>
          <MessageDateTime>
            <MessageDate variant="caption">July 5, 2022</MessageDate>
            <MessageTime variant="caption">12:01</MessageTime>
          </MessageDateTime>
        </UserMessageContainer>
        <AgentMessageContainer>
          <Typography mb={2}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla voluptates, ipsum ab
            corrupti cumque dicta in, consectetur quos odio assumenda maxime animi debitis tenetur
            voluptatem, maiores quaerat commodi harum! Impedit!
          </Typography>
          <MessageDateTime>
            <MessageDate variant="caption">July 5, 2022</MessageDate>
            <MessageTime variant="caption">12:01</MessageTime>
          </MessageDateTime>
        </AgentMessageContainer>
        <UserMessageContainer>
          <Typography mb={2}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore sunt temporibus laborum
            vero nobis dolorem eos earum! Sit est explicabo quis corporis minima nisi aspernatur.
            Rerum voluptatum placeat fugiat commodi.
          </Typography>
          <MessageDateTime>
            <MessageDate variant="caption">July 5, 2022</MessageDate>
            <MessageTime variant="caption">12:01</MessageTime>
          </MessageDateTime>
        </UserMessageContainer>
        <AgentMessageContainer>
          <Typography mb={2}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro blanditiis quidem in
            perferendis sit ullam corporis animi architecto sint quibusdam. Nisi facere assumenda
            aliquid perferendis, eaque officiis voluptate expedita necessitatibus!
          </Typography>
          <MessageDateTime>
            <MessageDate variant="caption">July 5, 2022</MessageDate>
            <MessageTime variant="caption">12:01</MessageTime>
          </MessageDateTime>
        </AgentMessageContainer>
        <UserMessageContainer>
          <Typography mb={2}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima quasi, pariatur
            cupiditate sint ipsam ab commodi eos adipisci nostrum tempora tempore, est quis corrupti
            voluptates rem accusantium alias quidem numquam.
          </Typography>
          <MessageDateTime>
            <MessageDate variant="caption">July 5, 2022</MessageDate>
            <MessageTime variant="caption">12:01</MessageTime>
          </MessageDateTime>
        </UserMessageContainer>
        <AgentMessageContainer>
          <Typography mb={2}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae natus pariatur asperiores
            consequatur eaque expedita eos tempore, illo eum magni incidunt enim iste minima sequi
            ad ratione architecto. Illum, debitis.
          </Typography>
          <MessageDateTime>
            <MessageDate variant="caption">July 5, 2022</MessageDate>
            <MessageTime variant="caption">12:01</MessageTime>
          </MessageDateTime>
        </AgentMessageContainer>
        <UserMessageContainer>
          <Typography mb={2}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio exercitationem
            quaerat repudiandae magni, nulla voluptate perspiciatis a quisquam minima, odit ut
            corporis expedita cupiditate numquam unde accusamus esse itaque perferendis!
          </Typography>
          <MessageDateTime>
            <MessageDate variant="caption">July 5, 2022</MessageDate>
            <MessageTime variant="caption">12:01</MessageTime>
          </MessageDateTime>
        </UserMessageContainer>
        <AgentMessageContainer>
          <Typography mb={2}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, quasi consequuntur ab
            voluptatum quae minus magni soluta ducimus alias illo provident repellendus dignissimos,
            temporibus harum adipisci repudiandae iure? Quasi, pariatur.
          </Typography>
          <MessageDateTime>
            <MessageDate variant="caption">July 5, 2022</MessageDate>
            <MessageTime variant="caption">12:01</MessageTime>
          </MessageDateTime>
        </AgentMessageContainer>
        <UserMessageContainer>
          <Typography mb={2}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, expedita fuga
            libero quia numquam vitae quaerat explicabo unde, nam culpa aut veritatis deserunt neque
            velit odio incidunt quos, beatae modi.
          </Typography>
          <MessageDateTime>
            <MessageDate variant="caption">July 5, 2022</MessageDate>
            <MessageTime variant="caption">12:01</MessageTime>
          </MessageDateTime>
        </UserMessageContainer>
        <AgentMessageContainer>
          <Typography mb={2}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa odit possimus aspernatur
            eum ab quod dolor perferendis, laborum, rem cupiditate commodi nihil doloribus
            praesentium voluptas molestias? Numquam rerum officiis assumenda?
          </Typography>
          <MessageDateTime>
            <MessageDate variant="caption">July 5, 2022</MessageDate>
            <MessageTime variant="caption">12:01</MessageTime>
          </MessageDateTime>
        </AgentMessageContainer>
        <UserMessageContainer>
          <Typography mb={2}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam quam magnam delectus earum
            qui reprehenderit placeat deleniti id nisi! Delectus enim optio dicta consequuntur unde
            nobis quas eaque odit asperiores.
          </Typography>
          <MessageDateTime>
            <MessageDate variant="caption">July 5, 2022</MessageDate>
            <MessageTime variant="caption">12:01</MessageTime>
          </MessageDateTime>
        </UserMessageContainer>
        <AgentMessageContainer>
          <Typography mb={2}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur vero dolor quod
            qui aliquid dicta, nobis harum sapiente facilis magnam. Aliquid mollitia voluptatibus
            vel perferendis quae quis, quaerat libero ad.
          </Typography>
          <MessageDateTime>
            <MessageDate variant="caption">July 5, 2022</MessageDate>
            <MessageTime variant="caption">12:01</MessageTime>
          </MessageDateTime>
        </AgentMessageContainer>
      </ChatArea>
      <TypingArea>
        <label htmlFor="icon-button-file">
          <FileInput accept="image/*" id="icon-button-file" type="file" />
          <IconButton color="primary" aria-label="upload picture" component="span">
            <AttachFile />
          </IconButton>
        </label>
        <TextArea
          fullWidth
          size="small"
          variant="outlined"
          value={text}
          onChange={(event) => setText(event.target.value)}
          type="text"
          placeholder="Type something..."
        />
      </TypingArea>
    </Container>
  );
};
