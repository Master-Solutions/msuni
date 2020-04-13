import React, { FC, ReactNode } from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CC } from '../../src/components/CC';
import { ErrorBoundary } from '../../src/components/ErrorBoundary';
import { silently } from '../silently';

describe('CC', () => {
	afterEach(cleanup);

	describe('default layout', () => {
		it('can render empty', () => {
			const { container } = render(<CC />);
			expect(container.innerHTML).toBe('<div></div>');
		});

		it('can render single part', () => {
			const { container } = render(
				<CC>
					<CC.Part id="p1">P1</CC.Part>
				</CC>
			);
			expect(container.innerHTML).toBe('<div>P1</div>');
		});

		it('can render multiple parts', () => {
			const { container } = render(
				<CC>
					<CC.Part id="p1">P1</CC.Part>
					<CC.Part id="p2">P2</CC.Part>
				</CC>
			);
			expect(container.innerHTML).toBe('<div>P1P2</div>');
		});

		it('throws if same id', () => {
			silently(() => {
				const { getByRole } = render(
					<ErrorBoundary showError={true}>
						<CC>
							<CC.Part id="p1">P1</CC.Part>
							<CC.Part id="p1">P2</CC.Part>
						</CC>
					</ErrorBoundary>
				);
				expect(getByRole('heading')).toHaveTextContent("CC part 'p1' is not unique.");
			});
		});
	});

	describe('custom layout', () => {
		type CustomLayoutProps = { header?: ReactNode };
		const CustomLayout: FC<CustomLayoutProps> = (props) => {
			return (
				<div>
					<h1>{props.header}</h1>
					{props.children}
				</div>
			);
		};

		describe('without mapping', () => {
			it('all parts go to children', () => {
				const { container } = render(
					<CC layout={CustomLayout}>
						<CC.Part id="p1">P1</CC.Part>
						<CC.Part id="p2">P2</CC.Part>
					</CC>
				);
				expect(container.innerHTML).toBe('<div><h1></h1>P1P2</div>');
			});
		});

		describe('with mapping', () => {
			it('all mapped', () => {
				const layoutPropsMap = {
					header: ['p1'],
					children: ['p2'],
				};
				const { container } = render(
					<CC layout={CustomLayout} layoutPropsMap={layoutPropsMap}>
						<CC.Part id="p1">P1</CC.Part>
						<CC.Part id="p2">P2</CC.Part>
					</CC>
				);
				expect(container.innerHTML).toBe('<div><h1>P1</h1>P2</div>');
			});

			it('partially mapped', () => {
				const layoutPropsMap = {
					header: ['p2'],
				};
				const { container } = render(
					<CC layout={CustomLayout} layoutPropsMap={layoutPropsMap}>
						<CC.Part id="p1">P1</CC.Part>
						<CC.Part id="p2">P2</CC.Part>
					</CC>
				);
				expect(container.innerHTML).toBe('<div><h1>P2</h1>P1</div>');
			});
		});
	});
});
