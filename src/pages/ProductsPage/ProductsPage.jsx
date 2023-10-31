// import { useEffect, useMemo } from 'react';
import Container from '../../components/Container/Container';
import Filter from '../../components/Products/Filter/Filter';
import { Section, Title, Wrap, NotFound } from './ProductsPage.styled';
import ProductsList from '../../components/Products/ProductsList/ProductsList';
import { useState } from 'react';
import { useGetAllProductsQuery, useGetProductByFilterQuery } from '../../redux/features/prodEndpoints';
import { useSelector } from 'react-redux';
import { isLogin } from '../../redux/selectors';
// import { useGetCurrentUserQuery } from '../../redux/features/authEndpoints';
import { useSearchParams } from 'react-router-dom';
// import { useMemo } from 'react';
const ProductsPage = () => {
  const isLoadedUser = useSelector(isLogin);
  const [currentCategory, setCurrentCategory] = useState();
  const [currentRecomm, setCurrentRecomm] = useState();
  const [excessCalories, setExcessCalories] = useState(0);
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, isFetching, error, isError } =
    useGetAllProductsQuery(isLoadedUser, { skip: !isLoadedUser });

  // const filterData = useGetProductByFilterQuery(
  //   Object.fromEntries([...searchParams]),
  // );

  // console.log(filterData.isFetching); //filterData.data - data

  // const currentUser = useGetCurrentUserQuery();
  // const blood = currentUser.data.profile.blood
  const blood = '2';

  // console.log(
  //   data?.map((product) =>
  //     product.title.toLowerCase().includes(searchParams?.get('query')),
  //   ),
  // );
  // console.log(searchParams.size === 0)

  // const { data, isLoading, isFetching, error, isError } =
  //   useGetAllProductsQuery(query, { skip: !isLoadedUser });

  // console.log(data)
  // НЕ потрібно викликати дані асинхронно, працюєте тільки із витягнутими, фіксованими, даними(data, error...)
  // для спрацьовування хука по умові ви в хук першим параметном передаєте що відсліжувати а другим параметром об'єкт з ключами
  // один з ключів це "skip" йому передаєте анонімну функцію обробщика або якусь перемінну. наприклад результат сулуктора токена
  // Приклад:
  //                             const { data, isLoading, isFetching, error, isError } =
  //                               useGetAllProductsQuery(isLoadedUser, { skip: !isLoadedUser });
  //
  // ВАЖЛИВО! USEnameMUTATION ВІДПРАЦЬОВУЮТЬ ПЕРЕД USEnameQUERY
  //
  // Перевірку додаткову на токен в шапкі чи передавати вручну токен на бекенд не потрібно,
  // токен пишеться в раз в стейт при логіні або при реєстрації а далі логіка вже прописана його підставлення в хедер,
  // просто берете дані які треба і не використовуєте токен, бо він вже в шапці запиту
  //
  // Параметри квері:
  //  data - дані які повертаються при успішному запиті
  //  isFetcing - вказує що запит завантажується, використовуємо для лоадера, повертає 'true' якщо йде запит до сервера та 'false' - коли запит закінчився
  //  isLoading - вказує що запит завантажується в перший раз, та в кеш ще нічого не записано, працює тільки при першому запиті і все
  //  isError - якщо була помилка запиту, повертає true або нічого, бо при false значить успішний запит і поверне 'isSuccess' = true
  // isSuccess - якщо запит успішний = true
  // Всі дані при першому запиту зберігаються у кеш, тому наступні запити вже не йдуть до бекенду а йдуть в кеш, якщо дані не змінювались
  // console.log('DATA: ', data);

  return (
    <Section>
      <div></div>
      <Container>
        <Wrap>
          <Title>Products</Title>
          <Filter
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
            currentRecomm={currentRecomm}
            setCurrentRecomm={setCurrentRecomm}
          />
        </Wrap>
        {isFetching && <p>Loading...</p>}
        {isError && (
          <p>
            {error.status}
            {error.data}
          </p>
        )}
        {data && (
          // (filterData().length === 0 ? (
          //   <NotFound>
          //     <p>
          //       <span>Sorry, no results were found</span> for the product
          //       filters you selected. You may want to consider other search
          //       options to find the product you want. Our range is wide and you
          //       have the opportunity to find more options that suit your needs.
          //     </p>
          //     <span>Try changing the search parameters.</span>
          //   </NotFound>
          // ) : (
          <ProductsList
            products={data}
            setExcessCalories={setExcessCalories}
            blood={blood}
            setIsAddedSuccess={setIsAddedSuccess}
          />
        )}
      </Container>
    </Section>
  );
};
export default ProductsPage;
