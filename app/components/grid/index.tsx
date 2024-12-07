/* Imports
---------------------------------------------------------------------------------------------------- */
import { ReactNode, Children, cloneElement } from 'react';
import styles from './style.module.scss';



/* Grid Component
----------------------------------------------------------------------------------------------------
	Name:
		Component Grid

	Description:
		Displays a Grid.

		The following props can (optionally) take a "responsive size object":
			$center
			$rowGap
			$colGap

		The "responsive size object" allows you to define different values for different responsive breakpoints.
		Please note that you do not need to define all of the breakpoints, only the ones you need.
		Defined values cascade DOWN, like when using "max-width" media queries.
		Here is an example "responsive size object" with all breakpoints included:
			{
				'xxxl': 'any normal value for this prop',
				'xxl': 'any normal value for this prop',
				'xl': 'any normal value for this prop',
				'l': 'any normal value for this prop',
				'm': 'any normal value for this prop',
				's': 'any normal value for this prop',
				'xs': 'any normal value for this prop',
				'xxs': 'any normal value for this prop',
				'xxxs': 'any normal value for this prop',
			}

	Params:
		$id
			Type: string
			Required: false
			Values: Any string
			Default: ''
			Description: Add an ID to this component.

		$className
			Type: string
			Required: false
			Values: Any string or CSS module
			Default: ''
			Description: Add a CSS class or module to this component.

		$align
			Type: string, object
			Required: true
			Values: 'left', 'center', 'right',  { responsive size object }
			Default: 'left'
			Description: Define the column alignment.

		$rowGap
			Type: string, object
			Required: true
			Values: 'xl', 'l', 'm', 's', 'xs', 'none', { responsive size object }
			Default: 'm'
			Description: Define the row gap size.

		$colGap
			Type: string, object
			Required: true
			Values: 'xl', 'l', 'm', 's', 'xs', 'none', { responsive size object }
			Default: 'm'
			Description: Define the column gap size.

		$size
			Type: string, number, object
			Required: true
			Values: 'auto', 'shrink', 'even', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, { responsive size object }
			Default: ''
			Description: Define the size for all items in this grid. This can be done in one of three ways -
				1. Use css flex style values such as "grow", "shrink" and "even" (for evenly size columns).
				2. Use a number between 1 and 12 to define a size based on a 12 column layout (similar to using a framework like Bootstrap).
				3. Using a "responsive size object".
*/
interface typedProps_grid {
	id?: string,
	className?: string,
	align?: string | object,
	rowGap?: string | object,
	colGap?: string | object,
	size?: string | object,
	children?: ReactNode
}

function Grid({
	id = '',
	className = '',
	align = 'left',
	rowGap = 'm',
	colGap = 'm',
	size = '',
	children = ''
}: typedProps_grid) {
	/* Build the class list
	-------------------------------------------------- */
	const classes = [styles.component_grid, className];


	/* Column alignment
	------------------------- */
	// String value
	if (typeof align === 'string') {
		classes.push(styles['align_' + align]);
	}
	// Responsive size object value
	else if (typeof align === 'object') {
		// Populate any missing breakpoints
		align = populateMissingBreakpoints(align);

		// Loop through the object
		Object.entries(align).forEach((item) => {
			// Get the breakpoint
			const breakpoint = item[0];

			// Get the value
			const value = item[1];

			// Convert the value to a string for use in the class name
			let stringValue = 'false';
			if (value) {
				stringValue = 'true';
			}

			// Add this as a class name
			classes.push(styles['align_' + breakpoint + '_' + stringValue]);
		});
	}


	/* Row gap
	------------------------- */
	// String value
	if (typeof rowGap === 'string') {
		classes.push(styles['rowGap_' + rowGap]);
	}
	// Responsive size object value
	else if (typeof rowGap === 'object') {
		// Populate any missing breakpoints
		rowGap = populateMissingBreakpoints(rowGap);

		// Loop through the object
		Object.entries(rowGap).forEach((item) => {
			// Get the breakpoint
			const breakpoint = item[0];

			// Get the value
			const value = item[1];

			// Add this as a class name
			classes.push(styles['rowGap_' + breakpoint + '_' + value]);
		});
	}


	/* Column gap
	------------------------- */
	// String value
	if (typeof colGap === 'string') {
		classes.push(styles['colGap_' + colGap]);
	}
	// Responsive size object value
	else if (typeof colGap === 'object') {
		// Populate any missing breakpoints
		colGap = populateMissingBreakpoints(colGap);

		// Loop through the object
		Object.entries(colGap).forEach((item) => {
			// Get the breakpoint
			const breakpoint = item[0];

			// Get the value
			const value = item[1];

			// Add this as a class name
			classes.push(styles['colGap_' + breakpoint + '_' + value]);
		});
	}


	/* Output the component
	-------------------------------------------------- */
	// Get the children
	let mappedChildren = children;

	// If we have a size prop on the parent Grid component
	if (size) {
		// Loop through the children (these will be the Item components)
		mappedChildren = Children.map(children as React.ReactElement, (child) => {
			// Clone the child element
			let clonedChild = cloneElement(child);

			// If it does not have a size prop defined
			if (typeof clonedChild['props' as keyof object]['size' as keyof object] === 'undefined' || !clonedChild['props' as keyof object]['size' as keyof object]) {
				// Add the size prop from the parent Grid component (we must re-clone the child element to do this)
				const newProps = {
					size: size
				};
				clonedChild = cloneElement(child, newProps);
			}

			// Return the cloned child element
			return clonedChild;
		});
	}

	// Return the component
	return (
		<div className={classes.join(' ')} id={id}>
			{mappedChildren}
		</div>
	);
}



/* Item Component
----------------------------------------------------------------------------------------------------
	Name:
		Component Item

	Description:
		Displays a Item.

	Params:
		$id
			Type: string
			Required: false
			Values: Any string
			Default: ''
			Description: Add an ID to this component.

		$className
			Type: string
			Required: false
			Values: Any string or CSS module
			Default: ''
			Description: Add a CSS class or module to this component.

		$size
			Type: string, number, object
			Required: true
			Values: 'grow', 'shrink', 'even', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, { responsive size object }
			Default: 'even'
			Description: Define the item size. This can be done in one of three ways -
				1. Use css flex style values such as "grow", "shrink" and "even" (for evenly size columns).
				2. Use a number between 1 and 12 to define a size based on a 12 column layout (similar to using a framework like Bootstrap).
				3. Using a "responsive size object".
*/
interface typedProps_item {
	id?: string,
	className?: string,
	size?: string | number | object,
	children?: ReactNode
}

function Item({
	id = '',
	className = '',
	size = 'even',
	children = ''
}: typedProps_item) {
	/* Build the class list
	-------------------------------------------------- */
	const classes = [styles.component_item, className];


	/* Size
	------------------------- */
	// String or number value
	if (typeof size === 'string' || typeof size === 'number') {
		classes.push(styles['size_' + size]);
	}
	// Responsive size object value
	else if (typeof size === 'object') {
		// Populate any missing breakpoints
		size = populateMissingBreakpoints(size);

		// Loop through the object
		Object.entries(size).forEach((item) => {
			// Get the breakpoint
			const breakpoint = item[0];

			// Get the value
			const value = item[1];

			// Add this as a class name
			classes.push(styles['size_' + breakpoint + '_' + value]);
		});
	}


	/* Output the component
	-------------------------------------------------- */
	return (
		<div className={classes.join(' ')} id={id}>
			{children}
		</div>
	);
}



/* Helper function to populate any missing breakpoints for a "responsive size object"
---------------------------------------------------------------------------------------------------- */
function populateMissingBreakpoints(obj: object) {
	// Populate XXXL
	if (typeof obj['xxxl' as keyof object] === 'undefined') {
		if (typeof obj['xxxl' as keyof object] !== 'undefined') {
			obj['xxxl' as keyof object] = obj['xxl' as keyof object];
		}
		else if (typeof obj['xl' as keyof object] !== 'undefined') {
			obj['xxxl' as keyof object] = obj['xl' as keyof object];
		}
		else if (typeof obj['l' as keyof object] !== 'undefined') {
			obj['xxxl' as keyof object] = obj['l' as keyof object];
		}
		else if (typeof obj['m' as keyof object] !== 'undefined') {
			obj['xxxl' as keyof object] = obj['m' as keyof object];
		}
		else if (typeof obj['s' as keyof object] !== 'undefined') {
			obj['xxxl' as keyof object] = obj['s' as keyof object];
		}
		else if (typeof obj['xs' as keyof object] !== 'undefined') {
			obj['xxxl' as keyof object] = obj['xs' as keyof object];
		}
		else if (typeof obj['xxs' as keyof object] !== 'undefined') {
			obj['xxxl' as keyof object] = obj['xxs' as keyof object];
		}
		else if (typeof obj['xxxs' as keyof object] !== 'undefined') {
			obj['xxxl' as keyof object] = obj['xxxs' as keyof object];
		}
	}

	// Populate XXL
	if (typeof obj['xxl' as keyof object] === 'undefined') {
		obj['xxl' as keyof object] = obj['xxxl' as keyof object];
	}

	// Populate XL
	if (typeof obj['xl' as keyof object] === 'undefined') {
		obj['xl' as keyof object] = obj['xxl' as keyof object];
	}

	// Populate L
	if (typeof obj['l' as keyof object] === 'undefined') {
		obj['l' as keyof object] = obj['xl' as keyof object];
	}

	// Populate M
	if (typeof obj['m' as keyof object] === 'undefined') {
		obj['m' as keyof object] = obj['l' as keyof object];
	}

	// Populate S
	if (typeof obj['s' as keyof object] === 'undefined') {
		obj['s' as keyof object] = obj['m' as keyof object];
	}

	// Populate XS
	if (typeof obj['xs' as keyof object] === 'undefined') {
		obj['xs' as keyof object] = obj['s' as keyof object];
	}

	// Populate XXS
	if (typeof obj['xxs' as keyof object] === 'undefined') {
		obj['xxs' as keyof object] = obj['xs' as keyof object];
	}

	// Populate XXXS
	if (typeof obj['xxxs' as keyof object] === 'undefined') {
		obj['xxxs' as keyof object] = obj['xxs' as keyof object];
	}

	return obj;
}



/* Export the components
---------------------------------------------------------------------------------------------------- */
export { Grid, Item };
