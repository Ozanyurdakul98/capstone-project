import React from 'react';
import { useState } from 'react';

function FormListings() {
	const [form, setForm] = useState({
		listingTitle: '',
		images: '',
		openingHours: 'Always Available',
		studiotype: 'Home Studio',
		services: [],
		locationFeatures: [],
		soundengineer: '',
		studioPricing: {},
		studioLocation: '',
	});
	const [checked, setChecked] = useState({
		soundengineer: false,
		studioPricing: [],
	});

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		console.log('formdata', form);
		try {
			const res = await fetch('/api/form', {
				method: 'POST',
				body: JSON.stringify(form),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (!res.ok) {
				throw new Error(res.status);
			}
			const result = await res.json();
			console.log(result);
			alert(`Is this your data: ${result.listingTitle}`);
		} catch (error) {
			console.error('Failed to add', error);
		}
	};

	const handleChange = (event) => {
		const target = event.target;
		const type = target.type;
		const name = target.name;
		const wert = target.value;
		const id = target.id;
		const value = checkValues(type, form, name, wert, id);
		setForm({ ...form, [name]: value() });
		console.log(form.studioPricing);
	};
	function checkValues(type, form, name, wert, id) {
		return () => {
			if (name === 'studioPricing') {
				const newObject = { ...form?.[name], [id]: wert };
				const test = Object.fromEntries(Object.entries(newObject).filter(([k, v]) => v));

				return test;
			}
			if (id === 'soundengineerPrice') {
				const newObject = { ...form?.[id], [id]: wert };

				return newObject;
			}
			if (type === 'checkbox' || type === 'file') {
				let newArray = [...form?.[name], wert];
				if (form?.[name].includes(wert)) {
					newArray = newArray.filter((service) => service !== wert);
				}
				return newArray;
			} else {
				return wert;
			}
		};
	}

	const handleCheck = (event) => {
		const target = event.target;
		const name = target.name;
		const id = target.id;
		const wert = target.value;
		const isChecked = () => {
			if (name === 'soundengineer') {
				return id;
			}
			if (name === 'studioPricing') {
				let newArray = [...checked?.[name], id];
				if (checked?.[name].includes(id)) {
					newArray = newArray.filter((pricing) => pricing !== id);
					const currentForm = { ...form?.[name], [id]: wert };
					const deleteUnchecked = Object.fromEntries(
						Object.entries(currentForm).filter((pricing) => !pricing.includes(id))
					);
					setForm({ ...form, [name]: deleteUnchecked });
				}
				return newArray;
			}
		};
		setChecked({ ...checked, [name]: isChecked() });
	};

	return (
		<div>
			<h1 className='text-primary mt-4 mb-2 text-center text-4xl font-bold leading-tight'>
				Add Studio Listing
			</h1>
			<form
				className='text-primary w-full '
				onSubmit={handleFormSubmit}
			>
				{/* title */}
				<fieldset className='w-full leading-tight'>
					<label
						htmlFor='titel'
						className='label-form block '
					>
						Listing Titel
					</label>
					<input
						className='input-form block'
						type='text'
						id='titel'
						name='listingTitle'
						required
						value={form.listingTitle}
						onChange={handleChange}
					/>
				</fieldset>
				{/* Mediafiles */}
				<fieldset className='w-full leading-tight'>
					<legend
						htmlFor='image'
						className=' label-form'
					>
						Mediafiles
					</legend>
					<div className='flex flex-row items-center justify-between md:flex-row '>
						<label
							className='relative flex h-60 w-40 cursor-pointer flex-col items-center justify-center rounded-xl border border-gray-500 bg-white'
							htmlFor='image'
						>
							<input
								className='  absolute bottom-0 h-6 w-40 cursor-pointer rounded-none border-0 border-t-2  p-0 text-center file:hidden'
								type='file'
								name='images'
								id='image'
								onChange={handleChange}
							/>
							Upload Image
						</label>
						<ul className='border-primary text-primary w-60 list-disc border-x-2  border-solid p-2 pl-8 text-sm md:absolute md:right-1 md:text-base lg:right-1/4'>
							<li className='list-none pb-2'>Tips for good photos:</li>
							<li>Different perspectives of the studio setup</li>
							<li>Show your equipment and instruments</li>
							<li>Show sitting areas, awards, kitchen, etc</li>
						</ul>
					</div>
				</fieldset>
				{/* OpeningHours */}
				<fieldset className='flex w-full gap-3 leading-tight'>
					<legend className='label-form'>Opening hours</legend>
					<div className='radio-form'>
						<input
							type='radio'
							id='openingHours'
							name='openingHours'
							value='Always Available'
							checked={form.openingHours.includes('Always Available')}
							onChange={handleChange}
						/>
						<label htmlFor='openingHours'>Always Available</label>
					</div>
					<div className='radio-form'>
						<input
							type='radio'
							id='onRequest'
							name='openingHours'
							value='On Request'
							checked={form.openingHours.includes('On Request')}
							onChange={handleChange}
						/>
						<label htmlFor='onRequest'>On Request</label>
					</div>
				</fieldset>
				{/* Studiotype */}
				<fieldset className='w-full leading-tight'>
					<legend className='label-form'>Studiotype</legend>
					<button
						type='button'
						className={
							form.studiotype === 'Premium Studio'
								? 'border-primary border-2 bg-red-500'
								: 'border-primary border-2'
						}
						onClick={() => {
							setForm({ ...form, studiotype: 'Premium Studio' });
						}}
					>
						<p>Premium Studio</p>
						<p>
							Studios with premium equipment, atmospheric rooms and many extras. The studio has many
							years of experience and top references.
							<br />
							The studio is in the upper price segment
						</p>
					</button>
					<button
						type='button'
						className={
							form.studiotype === 'Medium Studio'
								? 'border-primary border-2 bg-red-500'
								: 'border-primary border-2'
						}
						onClick={() => {
							setForm({ ...form, studiotype: 'Medium Studio' });
						}}
					>
						<p>Medium Studio</p>
						<p>
							Studios with good facilities. You have experience and already have good references.
							<br />
							The studio is in the middle price segment
						</p>
					</button>
					<button
						type='button'
						className={
							form.studiotype === 'Home Studio'
								? 'border-primary border-2 bg-red-500'
								: 'border-primary border-2'
						}
						onClick={() => {
							setForm({ ...form, studiotype: 'Home Studio' });
						}}
					>
						<p>Home Studio</p>
						<p>
							Your equipment serves its purpose. You want to get started and you may already have
							orders for yours Circle of acquaintances or others done.
							<br />
							The studio is in the lower price segment
						</p>
					</button>
				</fieldset>
				{/* services */}
				<fieldset className='w-full leading-tight'>
					<legend className='label-form'>Studio services</legend>
					<div className='checkbox-form'>
						<input
							id='recording'
							value='Recording'
							name='services'
							type='checkbox'
							checked={form.services.includes('Recording')}
							onChange={handleChange}
						/>
						<label htmlFor='recording'>Recording</label>
					</div>
					<div className='checkbox-form'>
						<input
							id='mix'
							value='Mix'
							name='services'
							type='checkbox'
							checked={form.services.includes('Mix')}
							onChange={handleChange}
						/>
						<label htmlFor='mix'>Mix</label>
					</div>
					<div className=' checkbox-form'>
						<input
							id='master'
							value='Master'
							name='services'
							type='checkbox'
							checked={form.services.includes('Master')}
							onChange={handleChange}
						/>
						<label htmlFor='master'>Master</label>
					</div>
					<div className=' checkbox-form'>
						<input
							id='musicproduction'
							value='Musicproduction'
							name='services'
							type='checkbox'
							checked={form.services.includes('Musicproduction')}
							onChange={handleChange}
						/>
						<label htmlFor='musicproduction'>
							Musicproduction <span className='text-sm'>(Recording, Mix & Master)</span>
						</label>
					</div>
					<div className=' checkbox-form'>
						<input
							id='rentAStudio'
							value='Rent Studio'
							name='services'
							type='checkbox'
							checked={form.services.includes('Rent Studio')}
							onChange={handleChange}
						/>
						<label htmlFor='rentAStudio'>
							Rent Studio <span className='text-sm'>(without Soundengineer)</span>
						</label>
					</div>
					<div className=' checkbox-form'>
						<input
							id='podcastAndAudiobooks'
							value='Podcast & Audiobooks'
							name='services'
							type='checkbox'
							checked={form.services.includes('Podcast & Audiobooks')}
							onChange={handleChange}
						/>
						<label htmlFor='podcastAndAudiobooks'>Podcast & Audiobooks</label>
					</div>
				</fieldset>
				{/* location-features */}
				<fieldset className='flex  w-full flex-wrap gap-3 leading-tight'>
					<legend className='label-form'>Location Features</legend>
					<div className='checkbox-form'>
						<input
							type='checkbox'
							id='parking'
							value='Parking'
							name='locationFeatures'
							onChange={handleChange}
						/>
						<label htmlFor='parking'>Parking</label>
					</div>
					<div className='checkbox-form'>
						<input
							type='checkbox'
							id='wifi'
							value='Wi-Fi'
							name='locationFeatures'
							onChange={handleChange}
						/>
						<label htmlFor='wifi'>Wi-Fi</label>
					</div>
					<div className='checkbox-form'>
						<input
							type='checkbox'
							id='snacks'
							value='Snacks'
							name='locationFeatures'
							onChange={handleChange}
						/>
						<label htmlFor='snacks'>Snacks</label>
					</div>
					<div className='checkbox-form'>
						<input
							type='checkbox'
							id='wc'
							value='WC'
							name='locationFeatures'
							onChange={handleChange}
						/>
						<label htmlFor='wc'>WC</label>
					</div>
					<div className='checkbox-form'>
						<input
							type='checkbox'
							id='kitchen'
							value='Kitchen'
							name='locationFeatures'
							onChange={handleChange}
						/>
						<label htmlFor='kitchen'>Kitchen</label>
					</div>
					<div className='checkbox-form'>
						<input
							type='checkbox'
							id='smoking'
							value='Smoking'
							name='locationFeatures'
							onChange={handleChange}
						/>
						<label htmlFor='smoking'>Smoking</label>
					</div>
				</fieldset>
				{/* Soundengineer */}
				<fieldset className='flex w-full flex-col gap-3 leading-tight'>
					<legend className='label-form'>Soundengineer</legend>
					<div className='radio-form'>
						<input
							type='radio'
							id='soundengineerNo'
							name='soundengineer'
							value='No Soundengineer'
							onChange={(event) => {
								handleChange(event);
								handleCheck(event);
							}}
						/>
						<label htmlFor='soundengineerNo'>
							No <span className='text-sm'>(Studio only for Rent)</span>
						</label>
					</div>
					<div className='radio-form'>
						<input
							type='radio'
							id='soundengineerOnRequest'
							name='soundengineer'
							value='On Request'
							onChange={(event) => {
								handleChange(event);
								handleCheck(event);
							}}
						/>
						<label htmlFor='soundengineerOnRequest'>On Request</label>
					</div>
					<div className='radio-form'>
						<input
							type='radio'
							id='soundengineerInclusive'
							name='soundengineer'
							value='Inclusive'
							onChange={(event) => {
								handleChange(event);
								handleCheck(event);
							}}
						/>
						<label htmlFor='soundengineerInclusive'>Inclusive</label>
					</div>
					<div className='radio-form flex items-center'>
						<input
							type='radio'
							name='soundengineer'
							id='soundengineerPrice'
							onChange={(event) => {
								handleChange(event);
								handleCheck(event);
							}}
						/>
						<label
							className='pr-1'
							htmlFor='soundengineerPrice'
						>
							Price:
						</label>
						<input
							className='priceInput-form outline-none'
							type='number'
							name='soundengineer'
							id='soundengineerPrice'
							disabled={checked.soundengineer != 'soundengineerPrice'}
							value={
								checked.soundengineer === 'soundengineerPrice'
									? form.soundengineer.soundengineerPrice
									: 0
							}
							onChange={handleChange}
						/>
						<label
							htmlFor='soundengineerPriceInput'
							className='mr-2'
						>
							€ / hour
						</label>
					</div>
				</fieldset>
				{/* studio-price */}
				<fieldset className='flex w-full flex-col gap-3 leading-tight'>
					<legend className='label-form'>Studio Pricing</legend>
					<div className='checkbox-form'>
						<input
							type='checkbox'
							name='studioPricing'
							id='studioPricingHour'
							onChange={(event) => {
								handleCheck(event);
							}}
						/>
						<label htmlFor='studioPricingHour'>per Hour</label>
						<input
							className='priceInput-form outline-none'
							type='number'
							name='studioPricing'
							id='studioPricingHour'
							disabled={!checked.studioPricing.includes('studioPricingHour')}
							value={
								!checked.studioPricing.includes('studioPricingHour')
									? 0
									: form.studioPricing.studioPricingHour === undefined
									? ''
									: form.studioPricing.studioPricingHour
							}
							onChange={handleChange}
						/>
						€
					</div>
					<div className='checkbox-form'>
						<input
							type='checkbox'
							name='studioPricing'
							id='studioPricingDay'
							onChange={(event) => {
								handleCheck(event);
							}}
						/>
						<label htmlFor='studioPricingDay'>per Day</label>
						<input
							className='priceInput-form outline-none'
							type='number'
							name='studioPricing'
							id='studioPricingDay'
							disabled={!checked.studioPricing.includes('studioPricingDay')}
							value={
								!checked.studioPricing.includes('studioPricingDay')
									? 0
									: form.studioPricing.studioPricingDay === undefined
									? ''
									: form.studioPricing.studioPricingDay
							}
							onChange={handleChange}
						/>
						€
					</div>
					<div className='checkbox-form'>
						<input
							type='checkbox'
							name='studioPricing'
							id='studioPricingWeek'
							onChange={(event) => {
								handleCheck(event);
							}}
						/>
						<label htmlFor='studioPricingWeek'>per Week</label>
						<input
							className='priceInput-form outline-none'
							type='number'
							name='studioPricing'
							id='studioPricingWeek'
							disabled={!checked.studioPricing.includes('studioPricingWeek')}
							value={
								!checked.studioPricing.includes('studioPricingWeek')
									? 0
									: form.studioPricing.studioPricingWeek === undefined
									? ''
									: form.studioPricing.studioPricingWeek
							}
							onChange={handleChange}
						/>
						€
					</div>
					<div className='checkbox-form'>
						<input
							type='checkbox'
							name='studioPricing'
							id='studioPricingMonth'
							onChange={(event) => {
								handleCheck(event);
							}}
						/>
						<label htmlFor='studioPricingMonth'>per Month</label>
						<input
							className='priceInput-form outline-none'
							type='number'
							name='studioPricing'
							id='studioPricingMonth'
							disabled={!checked.studioPricing.includes('studioPricingMonth')}
							value={
								!checked.studioPricing.includes('studioPricingMonth')
									? 0
									: form.studioPricing.studioPricingMonth === undefined
									? ''
									: form.studioPricing.studioPricingMonth
							}
							onChange={handleChange}
						/>
						€
					</div>
				</fieldset>
				{/* location */}
				<fieldset className='w-full leading-tight'>
					<legend className='label-form'>Location</legend>
					<input
						className='input-form'
						type='text'
						name='studioLocation'
						placeholder='Type [City], [Address]'
						required
						value={form.studioLocation}
						onChange={handleChange}
					/>
				</fieldset>
				{/* Form-Buttons */}
				<fieldset className='flex justify-between'>
					<button
						className='button bg-secondary text-white'
						type='button'
					>
						Reset
					</button>
					<button
						type='submit'
						className='button bg-secondary text-white'
					>
						Submit
					</button>
				</fieldset>
			</form>
		</div>
	);
}

export default FormListings;
