import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import myInfoApi, { IPersonInfo } from '@/api/myInfo';
import { IApiError } from '@/types/api';
import CenterWrapper from '@/components/CenterWrapper';
import Loader from '@/components/Loader';
import styled from 'styled-components';
import ContactInfo from '@/views/Info/Form/ContactInfo';
import NavBar from '@/views/Info/Form/NavBar';
import PersonalInfo from '@/views/Info/Form/PersonalInfo';
import IncomeInfo from '@/views/Info/Form/IncomeInfo';
import OtherInfo from '@/views/Info/Form/OtherInfo';

export enum EInfoPageType {
  CONTACT,
  PERSONAL,
  INCOME,
  OTHER
}

interface IAuthState {
  code: string;
  state?: string;
}

const Info: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<EInfoPageType | undefined>(undefined);
  const [personInfo, setPersonInfo] = useState<IPersonInfo | undefined>(undefined);
  const { state }: { state?: IAuthState } = useLocation();
  const navigate = useNavigate();

  const getPersonInfo = useCallback(
    async (code: string, state?: string) => {
      setLoading(true);
      try {
        const { result } = await myInfoApi.getPersonInfo({ code, state });
        setPersonInfo(result || undefined);
        setLoading(false);
      } catch (e) {
        navigate(ROUTES.HOME);
        alert((e as IApiError).message);
      }
    },
    [navigate]
  );

  const content = useMemo(() => {
    if (!personInfo) {
      return null;
    }
    switch (page) {
      case EInfoPageType.CONTACT:
        return <ContactInfo personInfo={personInfo} />;
      case EInfoPageType.PERSONAL:
        return <PersonalInfo personInfo={personInfo} />;
      case EInfoPageType.INCOME:
        return <IncomeInfo personInfo={personInfo} />;
      case EInfoPageType.OTHER:
        return <OtherInfo />;
      default:
        return null;
    }
  }, [page, personInfo]);

  useEffect(() => {
    const { code = 'test_code', state: authState } = state || {};
    if (code) {
      getPersonInfo(code, authState).then(() => {
        setPage(EInfoPageType.CONTACT);
      });
    } else {
      navigate(ROUTES.HOME);
      alert('Not authorized to view page');
    }
  }, [getPersonInfo, navigate, state]);

  return loading || !content ? (
    <CenterWrapper>
      <StyledLoader />
    </CenterWrapper>
  ) : (
    <InfoWrapper>
      <NavBar page={page} setPage={setPage} />
      {content}
    </InfoWrapper>
  );
};

export default Info;

const StyledLoader = styled(Loader)`
  width: auto;
  height: 50px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  padding-top: 20px;
  margin-left: auto;
  margin-right: auto;

  &:after {
    content: '';
    display: block;
    opacity: 0;
    width: 1px;
    height: 30px;
    flex: 0 0 auto;
  }
`;
