/* Imports
---------------------------------------------------------------------------------------------------- */
// Global styles
// Please note we're not using CSS modules on this demo page to keep things super simple.
import './scss/globals.scss';

// Grid components
import { Grid, Item } from "./components/grid";



/* Demo page
---------------------------------------------------------------------------------------------------- */
export default function RootLayout() {
	return (
		<html lang="en">
			<body>
				<h1>Grid Demo</h1>


				{/* Additional information
				-------------------------------------------------- */}
				<div className='info'>
					<strong>Please note -</strong><br />
					<br />
					All of the available options shown below can also be configured to change responsively (not included in this demo).<br />
					<br />
					For usage documentation, check out the <a href='https://github.com/jamenlyndon/grid-demo/blob/main/app/components/grid/index.tsx' target='_blank'>grid component code</a> in the Github repo.
				</div>


				{/* Flexible columns
				-------------------------------------------------- */}
				<h2>Flexible columns</h2>
				<Grid>
					<Item size='shrink'><p>Shrink</p></Item>
					<Item size='grow'><p>Grow</p></Item>
				</Grid>


				{/* Even columns
				-------------------------------------------------- */}
				<h2>Even columns</h2>
				<Grid size={'even'}>
					<Item><p>Even</p></Item>
					<Item><p>Even</p></Item>
					<Item><p>Even</p></Item>
				</Grid>


				{/* 12 grid size columns
				-------------------------------------------------- */}
				<h2>12 grid size columns</h2>
				<Grid>
					<Item size={2}><p>2</p></Item>
					<Item size={4}><p>4</p></Item>
					<Item size={3}><p>3</p></Item>
					<Item size={3}><p>3</p></Item>

					<Item size={6}><p>6</p></Item>
					<Item size={6}><p>6</p></Item>

					<Item size={8}><p>8</p></Item>
					<Item size={4}><p>4</p></Item>

					<Item size={12}><p>12</p></Item>
				</Grid>


				{/* Nested grids
				-------------------------------------------------- */}
				<h2>Nested grids</h2>
				<Grid>
					<Item size={4}>
						<p>4</p>
						<Grid>
							<Item size={6}><p>6</p></Item>
							<Item size={6}><p>6</p></Item>
						</Grid>
					</Item>
					<Item size={8}>
						<p>8</p>
						<Grid>
							<Item size={6}><p>6</p></Item>
							<Item size={4}><p>4</p></Item>
							<Item size={2}><p>2</p></Item>
						</Grid>
					</Item>
				</Grid>


				{/* Gap sizes
				-------------------------------------------------- */}
				<h2>Gap sizes</h2>
				<Grid colGap={'xl'} rowGap={'xl'}>
					<Item><p>Column gap XL</p></Item>
					<Item><p>Column gap XL</p></Item>
					<Item size={12}><p>Row gap XL</p></Item>
				</Grid>
				<Grid colGap={'l'} rowGap={'l'}>
					<Item><p>Column gap L</p></Item>
					<Item><p>Column gap L</p></Item>
					<Item size={12}><p>Row gap L</p></Item>
				</Grid>
				<Grid colGap={'m'} rowGap={'m'}>
					<Item><p>Column gap M</p></Item>
					<Item><p>Column gap M</p></Item>
					<Item size={12}><p>Row gap M</p></Item>
				</Grid>
				<Grid colGap={'s'} rowGap={'s'}>
					<Item><p>Column gap S</p></Item>
					<Item><p>Column gap S</p></Item>
					<Item size={12}><p>Row gap S</p></Item>
				</Grid>
				<Grid colGap={'xs'} rowGap={'xs'}>
					<Item><p>Column gap XS</p></Item>
					<Item><p>Column gap XS</p></Item>
					<Item size={12}><p>Row gap XS</p></Item>
				</Grid>


				{/* Centered columns
				-------------------------------------------------- */}
				<h2>Column alignment</h2>
				<Grid align='center' size='shrink'>
					<Item><p>Center</p></Item>
					<Item><p>Center</p></Item>
				</Grid>
				<Grid align='left' size='shrink'>
					<Item><p>Left</p></Item>
					<Item><p>Left</p></Item>
				</Grid>
				<Grid align='right' size='shrink'>
					<Item><p>Right</p></Item>
					<Item><p>Right</p></Item>
				</Grid>
			</body>
		</html>
	);
}
