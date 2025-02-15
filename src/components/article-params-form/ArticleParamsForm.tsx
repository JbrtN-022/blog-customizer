import { FormEvent, useState, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import clsx from 'clsx';
import { useCloseArticleOverlay } from '../hooks/CloseOverlay';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
//для новой ветки
export type ArticleProps = {
	setArticleState: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setArticleState }: ArticleProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const reverseRef = useRef<HTMLFormElement>(null);
	const [asideFormState, setAsideFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleChange = (key: string) => {
		return (value: OptionType) => {
			setAsideFormState({
				...asideFormState,
				[key]: value,
			});
		};
	};

	const toggleState = () => {
		setIsOpen((prev) => !prev);
	};

	const submitParams = (event: FormEvent) => {
		event.preventDefault();
		setArticleState(asideFormState);
		setIsOpen(false);
	};

	const resetParams = () => {
		setAsideFormState(defaultArticleState);
		setArticleState(defaultArticleState);
		setIsOpen(false);
	};

	useCloseArticleOverlay({
		isOpen: isOpen,
		rootRef: reverseRef,
		onClose: () => setIsOpen(false),
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleState} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={submitParams} ref={reverseRef}>
					<Text as='h2' weight={800} size={31} uppercase>
						задайте параметры
					</Text>

					<Select
						title='шрифт'
						selected={asideFormState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						title='размер шрифта'
						name='fontSize'
						selected={asideFormState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChange('fontSizeOption')}
					/>

					<Select
						title='цвет шрифта'
						selected={asideFormState.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
					/>

					<Separator></Separator>
					<Select
						title='цвет фона'
						selected={asideFormState.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
					/>

					<Select
						title='ширина контента'
						selected={asideFormState.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={resetParams}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
