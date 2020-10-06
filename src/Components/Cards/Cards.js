import React, { useReducer } from "react";
import Moment from "react-moment";
import changeHover from "../util/changeHover";
import CARD_ITEM from "../../globals/cardItem";
import "./cards.css";
import styled from "styled-components";
import DeleteIcon from "../DeleteIcon";

const Card = styled.div`
  display: flex;
  position: relative;
  margin: 2rem 0 2rem 0rem;
  border: 0.5px solid #e7e7e5;
  border-radius: 5px;
  flex-flow: column;
  width: 350px;
  margin-left: 0.6rem;
  margin-right: 0.6rem;
  box-shadow: 1px 2px 9px 3px #e7e7e7;
`;

const Header = styled.div`
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 5rem;
  align-items: center;
  padding: 1rem;
  font-weight: 600;
  box-sizing: border-box;
  border-bottom: 1px solid #e7e7e7;
`;
const Link = styled.a`
  text-decoration: none;
  color: black;
  :hover {
    color: #8c2ce6;
  }
`;

const HeaderName = styled.div`
  width: 60%;
  display: flex;
  text-align: left;
`;

const SmallImage = styled.img`
  height: 50px;
`;

const CardItem = styled.div`
  display: flex;
  height: 3rem;
  align-items: center;
  font-size: 0.9rem;
  padding: 0 1rem;
  flex-wrap: wrap;
  box-sizing: border-box;
  margin: 0 auto;
  justify-content: space-between;
  width: 100%;
  border-bottom: 0.5px solid #e7e7e54a;
`;

const Label = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 50%;
  align-items: center;
`;

const Icon = styled.i`
  margin-left: 5px;
  margin-right: 5px;
`;

export default (props) => {
  const [classes, dispatch] = useReducer(changeHover, {});
  const cards = props.cards.map((info) => (
    <Card key={info.id}>
      {props.deleteCard && (
        <div>
          <DeleteIcon
            handleClick={() => {
              props.deleteCard(info.id);
            }}
          />
        </div>
      )}
      <Header>
        <HeaderName>
          <Link href={info.html_url} target="_blank" rel="noopener noreferrer">
            {info.full_name}
          </Link>
        </HeaderName>
        <SmallImage src={info.owner.avatar_url} alt={info.owner.login} />
      </Header>
      <CardItem
        className={`${classes.language}`}
        onMouseEnter={() => dispatch({ type: CARD_ITEM.LANGUAGE })}
        onMouseLeave={() => dispatch({})}
      >
        <Label>
          <Icon className="fa fa-language" aria-hidden="true"></Icon>
          Language
        </Label>
        {info.language || "Not available"}
      </CardItem>
      <CardItem
        className={`${classes.stars}`}
        onMouseEnter={() => dispatch({ type: CARD_ITEM.STARS })}
        onMouseLeave={() => dispatch({})}
      >
        <Label>
          <Icon className="fa fa-star" aria-hidden="true"></Icon>
          Stars
        </Label>
        {info.stargazers_count}
      </CardItem>
      <CardItem
        className={`${classes.forks}`}
        onMouseEnter={() => dispatch({ type: CARD_ITEM.FORKS })}
        onMouseLeave={() => dispatch({})}
      >
        <Label>
          <Icon className="fa fa-code-fork" aria-hidden="true"></Icon>
          Forks
        </Label>
        {info.forks}
      </CardItem>
      <CardItem
        className={`${classes.openIssue}`}
        onMouseEnter={() => dispatch({ type: CARD_ITEM.OPEN_ISSUES })}
        onMouseLeave={() => dispatch({})}
      >
        <Label>
          <Icon className="fa fa-exclamation-circle" aria-hidden="true"></Icon>
          Open issues
        </Label>
        {info.open_issues_count}
      </CardItem>
      <CardItem
        className={`${classes.createdAt}`}
        onMouseEnter={() => dispatch({ type: CARD_ITEM.CREATED_AT })}
        onMouseLeave={() => dispatch({})}
      >
        <Label>
          <Icon className="fa fa-birthday-cake" aria-hidden="true"></Icon>
          Created At
        </Label>
        <Moment fromNow interval={2000}>
          {info.created_at}
        </Moment>
      </CardItem>
      <CardItem
        className={`${classes.lastUpdated}`}
        onMouseEnter={() => dispatch({ type: CARD_ITEM.LAST_UPDATED })}
        onMouseLeave={() => dispatch({})}
      >
        <Label>
          <Icon className="fa fa-wrench" aria-hidden="true"></Icon>
          Last update
        </Label>
        <Moment fromNow interval={2000}>
          {info.updated_at}
        </Moment>
      </CardItem>
    </Card>
  ));
  return <div className="compare-cards">{cards}</div>;
};
