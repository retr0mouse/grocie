import { Popover, Transition } from '@headlessui/react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { alpha, AppBar, Box, InputBase, styled, Toolbar, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import red from "@mui/material/colors/red";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grocery } from 'groceries-component';
import Image from 'next/image';
import Link from 'next/link';
import BreadPicture from '../images/bread.svg';
import ChildrenPicture from '../images/children.svg';
import CleaningPicture from '../images/cleaning.svg';
import DrinksPicture from '../images/drinks.svg';
import FlourPicture from '../images/flour.svg';
import FrozenPicture from '../images/frozen.svg';
import HomePicture from '../images/home.svg';
import MeatPicture from '../images/meat.svg';
import MilkPicture from '../images/milk.svg';
import BrushPicture from '../images/toothbrush.svg';
import VegetablesPicture from '../images/vegetables.svg';


const Soodnecolor = deepOrange[400]

const themeColor = createTheme({
	palette: {
		primary: {
			main: red[50]
		},
		secondary: {
			main: '#ff5722',
		},
	}
});

const Search = styled('div')(({ theme }) => ({
	borderRadius: "16px",
	backgroundColor: alpha(theme.palette.common.black, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.black, 0.25),
	},
	width: '60%',
	[theme.breakpoints.up('sm')]: {
		width: 'center',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(2, 2),
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inerit',
	marginRight: theme.spacing(20),
	'& .MuiInputBase-input': {
		padding: theme.spacing(2, 2, 2),
		paddingLeft: theme.spacing(7),
		transition: theme.transitions.create('width'),
		[theme.breakpoints.up('sm')]: {
			width: 'auto'
		},
	},
}));


interface Props {
	total: number;
	items: Map<Grocery, number>,
	triggerOpen: boolean
}

export default function NavigationBar(props: Props) {
	let items = [] as Grocery[];
	let values = [] as number[];

	if (props.items.size !== 0) {
		items = Array.from(props.items.keys());
		values = Array.from(props.items.values());
	}

	return (
		<div>
			<ThemeProvider theme={themeColor}>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="relative" className={"shadow-none"}>
					<Toolbar>
						<Typography
							color={Soodnecolor}
							variant="h2"
							component="div"
							sx={{ mr: 3 }}
						>
							<a className="ml-40" href="/" >Soodne</a>
						</Typography>
						<Search sx={{ zIndex: 'tooltip' }}>
							<SearchIconWrapper>
								<SearchIcon />
							</SearchIconWrapper>
							<StyledInputBase
								placeholder="Search…"
								inputProps={{ 'aria-label': 'search' }}
							/>
						</Search>
						<Popover className={'h-10 sticky top-0 z-[200]'}>
							{({ open }) => (
								<>
									<Popover.Button className={`focus:outline-none sticky top-0 h-10`}>
										<div className='group w-96 flex h-10'>
											<ShoppingCartOutlinedIcon className={"ml-5 group-hover:fill-orange-700 w-10 h-10 duration-75"}/>
											{values.length > 0 ? <span className={'absolute left-10 -top-2 bg-slate-500 w-6 h-6 bg-opacity-85 rounded-full m-0 items-center text-center justify-center'}> 
                      						<p className='text-white'>{values.length > 0  ? values.reduce((result, current) => result + current) : null}</p>
											</span>: null} 
											<p className='ml-3 text-2xl text-slate-700 font-medium group-hover:text-orange-700 duration-75'>{props.total} €</p>
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
										<Popover.Panel className={'absolute -left-[100px] rounded-2xl bg-orange-500 bg-opacity-90' }>
											<div className='p-2 rounded-2xl w-96'>
											<Link href={'/basket'}>
												<div className='bg-orange-100 border-2 border-orange-300 w-full h-fit mb-5 rounded-xl transition ease-in-out delay-50 hover:scale-95 duration-150 '>
													<p className='text-2xl text-slate-700 font-medium text-center p-2'>Sinu ostukorv</p>
												</div>
											</Link>
												{items.length > 0 ? items.map((item: Grocery, index: number) => {
													return (
														<div className='flex items-center bg-white rounded-xl gap-3 mb-2 p-2' key={index}>
															<div className={'block relative'}>
																<img className={"w-20"} src={item.image}/>
																<span className={'absolute bottom-0 right-0 bg-slate-500 w-8 h-8 bg-opacity-85 rounded-full m-0 flex items-center text-center justify-center'}> <p className='text-white'>{values[index]}</p> </span>
															</div>
															<p key={index}><span>{item.name.length > 15 ? item.name.substring(0,15) + '...': item.name}</span> {item.price} €</p>
														</div>
													)
												}): <p className="text-xl text-slate-700 font-medium text-center">Sinu ostukorv on tühi!</p>}
											</div>
										</Popover.Panel>
									</Transition>
								</>
							)}
						</Popover>
					</Toolbar>
				</AppBar>
			</Box>
			<div className="p-7 bg-white flex place-content-center space-x-5">
				<Link href={'/category/0'}>
					<div className='flex-column w-32 h-auto transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
						<button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
							bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
							<Image className="w-24 h-24 flex" src={VegetablesPicture} alt="" />
						</button>
						<p className='mt-3 text-xl text-slate-700 font-medium text-center break-normal transition
						flex place-content-center place-items-center'>Köögiviljad, puuviljad</p>
					</div>
				</Link>

				<Link href={'/category/1'}>				
					<div className='flex-column w-32 h-auto transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
						<button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
						bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
							<Image className="w-24 h-24 flex" src={MilkPicture} alt="" />
						</button>
						<p className='mt-3 text-xl text-slate-700 font-medium text-center break-normal 
						flex place-content-center place-items-center'>Piimatooted ja munad
						</p>
					</div>
				</Link>

				<Link href={'/category/2'}>	
					<div className='flex-column w-32 h-auto transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
						<button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
						bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
							<Image className="w-24 h-24 flex" src={BreadPicture} alt="" />
						</button>
						<p className='mt-3 text-xl text-slate-700 font-medium text-center break-normal 
						flex place-content-center place-items-center'>Leivad, saiad, kondiitritooted
						</p>
					</div>
				</Link>

				<Link href={'/category/3'}>	
					<div className='flex-column w-32 h-auto transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
						<button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
						bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
							<Image className="w-24 h-24 flex" src={MeatPicture} alt="" />
						</button>
						<p className='mt-3 text-xl text-slate-700 font-medium text-center break-normal 
						flex place-content-center place-items-center'>Liha, kala, valmistoit
						</p>
					</div>
				</Link>
				
				<Link href={'/category/4'}>	
					<div className='flex-column w-32 h-auto transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
						<button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
						bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
							<Image className="w-24 h-24 flex" src={FlourPicture} alt="" />
						</button>
						<p className='mt-3 text-xl text-slate-700 font-medium text-center break-normal 
						flex place-content-center place-items-center'>Kauasäilivad toidukaubad
						</p>
					</div>
				</Link>

				<Link href={'/category/5'}>	
					<div className='flex-column w-32 h-auto transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
						<button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
						bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
							<Image className="w-24 h-24 flex" src={FrozenPicture} alt="" />
						</button>
						<p className='mt-3 text-xl text-slate-700 font-medium text-center break-normal 
						flex place-content-center place-items-center'>Külmutatud tooted
						</p>
					</div>
				</Link>
				
				<Link href={'/category/6'}>	
					<div className='flex-column w-32 h-auto transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
						<button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
						bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
							<Image className="w-24 h-24 flex" src={DrinksPicture} alt="" />
						</button>
						<p className='mt-3 text-xl text-slate-700 font-medium text-center break-normal 
						flex place-content-center place-items-center'>Joogid
						</p>
					</div>
				</Link>

				<Link href={'/category/7'}>	
					<div className='flex-column w-32 h-auto transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
						<button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
						bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
							<Image className="w-24 h-24 flex" src={BrushPicture} alt="" />
						</button>
						<p className='mt-3 text-xl text-slate-700 font-medium text-center break-normal 
						flex place-content-center place-items-center'>Enesehooldus tooted
						</p>
					</div>
				</Link>
				
				<Link href={'/category/8'}>	
					<div className='flex-column w-32 h-auto transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
						<button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
						bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
							<Image className="w-24 h-24 flex" src={CleaningPicture} alt="" />
						</button>
						<p className='mt-3 text-xl text-slate-700 font-medium text-center break-normal 
						flex place-content-center place-items-center'>Puhastustarbed ja loomatooted
						</p>
					</div>
				</Link>
				
				<Link href={'/category/9'}>	
					<div className='flex-column w-32 h-auto transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
						<button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
						bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
							<Image className="w-24 h-24 flex" src={ChildrenPicture} alt="" />
						</button>
						<p className='mt-3 text-xl text-slate-700 font-medium text-center break-normal 
						flex place-content-center place-items-center'>Lastekaubad
						</p>
					</div>
				</Link>
				
				<Link href={'/category/10'}>	
					<div className='flex-column w-32 h-auto transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
						<button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
						bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
							<Image className="w-24 h-24 flex" src={HomePicture} alt="" />
						</button>
						<p className='mt-3 text-xl text-slate-700 font-medium text-center break-normal 
						flex place-content-center place-items-center'>Kodukaubad ja vaba aeg
						</p>
					</div>
				</Link>
			</div>
		</ThemeProvider>

		</div>
		
	);
}