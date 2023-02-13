import { Popover, Transition } from '@headlessui/react';
import { Grocery } from 'groceries-component';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import BreadPicture from '../images/bread.svg';
import ChildrenPicture from '../images/children.svg';
import CleaningPicture from '../images/cleaning.svg';
import DrinksPicture from '../images/drinks.svg';
import FlourPicture from '../images/flour.svg';
import FrozenPicture from '../images/frozen.svg';
import HomePicture from '../images/home.svg';
import MeatPicture from '../images/meat.svg';
import MilkPicture from '../images/milk.svg';
import OtherPicture from '../images/other.svg';
import BrushPicture from '../images/toothbrush.svg';
import VegetablesPicture from '../images/vegetables.svg';
import { trpc } from '../utils/trpc';
import BasketPopupItem from './BasketPopupItem';
import SearchBarItem from './SearchBarItem';
import CartIcon from './../images/cart-black.svg';
import SearchBar from './SearchBar';

interface Props {
	total: number;
	items: Map<string, [Grocery, number]>,
	triggerOpen: boolean,
	onChanged(item: Grocery, count: number): void;
}

const categories = [
	[VegetablesPicture, "Köögiviljad, puuviljad"],
	[MilkPicture, "Piimatooted ja munad"],
	[BreadPicture, "Leivad, saiad, kondiitritooted"],
	[MeatPicture, "Liha, kala, valmistoit"],
	[FlourPicture, "Kauasäilivad toidukaubad"],
	[FrozenPicture, "Külmutatud tooted"],
	[DrinksPicture, "Joogid"],
	[BrushPicture, "Enesehooldus tooted"],
	[CleaningPicture, "Puhastustarbed ja loomatooted"],
	[ChildrenPicture, "Lastekaubad"],
	[HomePicture, "Kodukaubad ja vaba aeg"],
	[OtherPicture, "Muu"]
];

export default function NavigationBar(props: Props) {
	const [query, setQuery] = useState<string>("");
	const findItem = trpc.findItem.useQuery({ title: query?.length > 0 ? query : "" });
	const [openSearchBar, setOpenSearchBar] = useState(false);
	// setOpenSearchBar(findItem.data ? true : false);
	let titles: string[];
	let values: [Grocery, number][] = [];

	if (props.items.size !== 0) {
		titles = Array.from(props.items.keys());
		values = Array.from(props.items.values());
	}

	useEffect(() => {
		if (findItem?.data && findItem?.data?.length > 0) {
			setOpenSearchBar(true);
		} else {
			setOpenSearchBar(false);
		}
	}, [query])

	return (
		<>
			<div className="relative flex flex-col shadow-none items-center">
				<div className='flex w-full place-content-center sm:place-content-evenly'>
					<a className="" href="/">
						<h1 className='text-5xl text-amber-500 font-medium m-5'>
							Grocie
						</h1>
					</a>
					<div className='hidden sm:block self-center w-[60%] h-12'>
						<SearchBar
							placeholder="Search…"
							onChanged={(text) => setQuery(text)}
						/>
						<Popover className={'flex absolute mt-56'} >
							{({ open }) => (
								<>
									<Transition
										className={`${openSearchBar ? "fixed right-150 top-16 rounded border-2 border-black " : "hidden"}`}
										show={openSearchBar || open}
										enter="transition duration-100 ease-out"
										enterFrom="transform scale-95 opacity-0"
										enterTo="transform scale-100 opacity-100"
										leave="transition duration-75 ease-out"
										leaveFrom="transform scale-100 opacity-100"
										leaveTo="transform scale-95 opacity-0"
									>
										<Popover.Panel className={'bg-white mt-46'}>
											{findItem.data ? findItem.data?.map((item, index) => {
												return (
													<SearchBarItem
														key={index}
														item={item}
													/>
												)
											}) : null}
										</Popover.Panel>
									</Transition>
								</>
							)}
						</Popover>
					</div>


					<Popover className={'relative flex items-center z-10'}>
						{({ open }) => (
							<>
								<Popover.Button className={`hidden sm:block focus:outline-none sticky top-4 h-10`}>
									<div className='group w-auto flex h-10'>
										<div className={" group-hover:fill-orange-700 w-10 h-10 duration-75 mr-4"} >
											<Image className='w-min' src={CartIcon} alt={'shopping cart icon'} />
										</div>
										{values?.length > 0 ?
											<span className={'absolute left-6 -top-2 bg-slate-500 w-6 h-6 bg-opacity-85 rounded-full m-0 items-center text-center justify-center'}>
												<p className='text-white'>{values.length > 0 ? values.reduce((resultItem, currentItem) => [resultItem[0], resultItem[1] + currentItem[1]])[1] : 0}</p>
											</span> : null}
										<p className='text-2xl text-slate-700 font-medium group-hover:text-orange-700 duration-75 whitespace-nowrap'>{props.total} €</p>
									</div>
								</Popover.Button>
								<Transition
									className={`${props.triggerOpen ? "fixed right-150 top-0" : ""}`}
									show={props.triggerOpen || open}
									enter="transition duration-100 ease-out"
									enterFrom="transform scale-95 opacity-0"
									enterTo="transform scale-100 opacity-100"
									leave="transition duration-75 ease-out"
									leaveFrom="transform scale-100 opacity-100"
									leaveTo="transform scale-95 opacity-0"
								>
									<Popover.Panel className={'hidden sm:block sm:absolute right-0 mx-auto mt-5 w-screen max-w-sm px-4 sm:right-full sm:px-0 lg:max-w-2xl rounded-md bg-slate-200'}>
										<div className='p-5'>
											<h1 className='font-sans font-semibold text-slate-800 text-2xl mb-3'>Shopping cart</h1>
											{values?.length > 0 ? values.map((item, index: number) => {
												return (
													<BasketPopupItem
														key={index}
														item={item[0]}
														onChanged={(counter) => props.onChanged(item[0], counter)}
														count={props.items.get(item[0].name)?.[1]}
													/>
												)
											}) : <p className="text-xl text-slate-700 font-medium text-center">Sinu ostukorv on tühi!</p>}
											<Link href={'/basket'}>
												<div className='bg-[#f1bb4e] w-full h-fit mt-5 rounded-xl transition ease-in-out delay-50 hover:bg-[#d1a246] duration-150 '>
													<p className='text-2xl text-slate-100 font-medium text-center p-2'>View shopping cart - {props.total} €</p>
												</div>
											</Link>
										</div>
									</Popover.Panel>
								</Transition>
							</>
						)}
					</Popover>
				</div>
				<div className="block sm:hidden w-[90%] self-center h-12 my-5">
					<SearchBar
						placeholder="Search…"
						onChanged={(text) => setQuery(text)}
					/>
					<Popover className={'flex absolute mt-56'} >
						{({ open }) => (
							<Transition
								className={`${openSearchBar ? "fixed right-150 top-16 rounded border-2 border-black " : ""}`}
								show={openSearchBar || open}
								enter="transition duration-100 ease-out"
								enterFrom="transform scale-95 opacity-0"
								enterTo="transform scale-100 opacity-100"
								leave="transition duration-75 ease-out"
								leaveFrom="transform scale-100 opacity-100"
								leaveTo="transform scale-95 opacity-0"
							>
								<Popover.Panel className={'bg-white mt-46'}>
									{findItem.data ? findItem.data?.map((item, index) => {
										return (
											<SearchBarItem
												key={index}
												item={item}
											/>
										)
									}) : null}
								</Popover.Panel>
							</Transition>
						)}
					</Popover>
				</div>

			</div>
			<div className="hidden p-[2vw] bg-white sm:flex place-content-center gap-[1vw]">
				{categories.map((category, index) => {
					return (
						<Link href={`/category/${index}`} key={index}>
							<div className='flex flex-col max-w-[150px] max-h-[200px] items-center text-center transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
								<div className='transition ease-in-out delay-50 hover:scale-110 hover:bg-orange-200 duration-200 bg-orange-50 rounded-full border-2 border-orange-100'>
									<Image className='w-full h-full p-[1vw]' src={category[0]} alt="" />
								</div>
								<p className='mt-3 text-[1vw] text-slate-700 font-medium break-word'>
									{category[1]}
								</p>
							</div>
						</Link>
					)
				})}
			</div>
		</>

	);
}
