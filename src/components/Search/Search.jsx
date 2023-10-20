import React from "react";
import styled from "styled-components";
import { BiSearchAlt2 } from "react-icons/bi";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const inputRef = useRef("");
  const router = useRouter();
  const searchKeyword = (e) => {
    e.preventDefault();
    const keyword = inputRef.current.value;
    router.push(`pokemon?/${keyword}`);
    inputRef.current.value = "";
  };
  return (
    <form onSubmit={searchKeyword}>
      <S.SearchBox>
        <S.SearchInput placeholder="검색어를 입력해주세요." ref={inputRef} />
        <S.SearchButton>
          <BiSearchAlt2 />
        </S.SearchButton>
      </S.SearchBox>
    </form>
  );
};

export default Search;

export const S = {};
S.SearchBox = styled.div`
  position: relative;
`;
S.SearchInput = styled.input`
  width: 320px;
  height: 30px;

  border: 1px solid #000;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.3s;
  font-size: 14px;
  :focus {
    border-color: #007bff;
  }
`;
S.SearchButton = styled.button`
  position: absolute;
  cursor: pointer;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  background-color: transparent;
`;
