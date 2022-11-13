import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getBarboraCategories, getBarboraItemsByUrl, getRimiCategories} from '../lib/items';
import { trpc } from '../utils/trpc';

export async function getStaticProps() {  // for ssg
  const allItems = await getBarboraItemsByUrl('https://barbora.ee/');
  const allCategoriesBarbora = await getBarboraCategories();
  const allCategoriesRimi = await getRimiCategories();
  

  return {
    props:{
      allItems,
      allCategoriesBarbora,
      allCategoriesRimi
    }
  }
}

export default function Home({ allCategoriesBarbora, allCategoriesRimi}: {allCategoriesBarbora: any[], allCategoriesRimi: any[]}) {
  const helloNoArgs = trpc.hello.useQuery();
  const helloWithArgs = trpc.hello.useQuery({ text: 'client' });
  const mutation = trpc.addProduct.useMutation(); // in future use this with mutation.mutate() to add products
  const [title, setTitle] = useState("Banaan");
  const [result, setResult] = useState("Banaan");
  const query = trpc.findItem.useQuery({title: result});
  
  if (helloWithArgs.isLoading) return <h1>Loading....</h1>
  
  return (
    <Layout>
    <Head>
      <title>Groceries comparing app</title>|
    </Head>
    <div className="flex p-10 absolute gap-10 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] border-solid border-2 border-indigo-400 rounded-2xl">
      <div className='flex flex-col items-center gap-5'>
        <h1 className="font-sans text-4xl font-bold">Barbora</h1>
        <div className='flex flex-col'>
          {allCategoriesBarbora.map((item: any, key) => {
            return (
              <Link legacyBehavior key={key} href={`/category/barbora/${item.path}`}><a key={key} className='font-sans text-lg py-1.5 pl-1 pr-1my-2 hover:underline visited:text-purple-600'>{item.title}</a></Link>
            );
          })}
        </div>
      </div>

      <div className='flex flex-col items-center gap-5'>
        <h1 className="font-sans text-4xl font-bold">Rimi</h1> 
        <div className='flex flex-col'>
          {allCategoriesRimi.map((item: any, key) => {
          return (
            <Link legacyBehavior key={key} href={`/category/rimi/${item.path}`}><a key={key} className='font-sans text-lg py-1.5 pl-1 pr-1my-2 hover:underline visited:text-purple-600'>{item.title}</a></Link>
          );
        })}
        </div>
      </div>
    </div>
    <div className={"relative left-1/2 transform -translate-x-1/2 flex flex-col w-10, "}>
      <input type="text" className={"bg-slate-600"} defaultValue={title} onChange={(input) => setTitle(input.target.value)}/> 
      <h1 className={"bg-red-600"}>RESULT: {query.data ?? "nothing"}</h1>
    </div>
  </Layout>
)
}