import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getBarboraCategories, getBarboraItemsByUrl} from '../lib/items';

export async function getStaticProps() {  // for ssg
  const allItems = await getBarboraItemsByUrl('https://barbora.ee/');
  const allCategoriesBarbora = await getBarboraCategories();
  return {
    props:{
      allItems,
      allCategoriesBarbora,
    }
  }
}

export default function Home({ allCategoriesBarbora}: {allCategoriesBarbora: any[]}) {
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
      </div>
    </Layout>
  )
}
