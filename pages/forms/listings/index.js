import React from 'react';

function FormListings() {
	return (
		<div>
			<h1 className='text-primary mt-4 mb-2 text-center text-4xl font-bold leading-tight'>
				Add Studio Listing
			</h1>
			<form className='text-primary w-full '>
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
						name='listingTitel'
						required
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
							value='Always available'
							name='openingHours'
						/>
						<label htmlFor='openingHours'>Always available</label>
					</div>
					<div className='radio-form'>
						<input
							type='radio'
							id='onRequest'
							value='On Request'
							name='openingHours'
						/>
						<label htmlFor='onRequest'>On Request</label>
					</div>
				</fieldset>
				{/* Studiotype */}
				<fieldset className='w-full leading-tight'>
					<legend className='label-form'>Studiotype</legend>
					<button
						type='button'
						className='border-primary border-2'
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
						className='border-primary border-2'
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
						className='border-primary border-2'
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
						/>
						<label htmlFor='recording'>Recording</label>
					</div>
					<div className='checkbox-form'>
						<input
							id='mix'
							value='Mix'
							name='services'
							type='checkbox'
						/>
						<label htmlFor='mix'>Mix</label>
					</div>
					<div className=' checkbox-form'>
						<input
							id='master'
							value='Master'
							name='services'
							type='checkbox'
						/>
						<label htmlFor='master'>Master</label>
					</div>
					<div className=' checkbox-form'>
						<input
							id='musicproduction'
							value='Musicproduction'
							name='services'
							type='checkbox'
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
						/>
						<label htmlFor='parking'>Parking</label>
					</div>
					<div className='checkbox-form'>
						<input
							type='checkbox'
							id='wifi'
							value='Wi-Fi'
							name='locationFeatures'
						/>
						<label htmlFor='wifi'>Wi-Fi</label>
					</div>
					<div className='checkbox-form'>
						<input
							type='checkbox'
							id='snacks'
							value='Snacks'
							name='locationFeatures'
						/>
						<label htmlFor='snacks'>Snacks</label>
					</div>
					<div className='checkbox-form'>
						<input
							type='checkbox'
							id='wc'
							value='WC'
							name='locationFeatures'
						/>
						<label htmlFor='wc'>WC</label>
					</div>
					<div className='checkbox-form'>
						<input
							type='checkbox'
							id='kitchen'
							value='Kitchen'
							name='locationFeatures'
						/>
						<label htmlFor='kitchen'>Kitchen</label>
					</div>
					<div className='checkbox-form'>
						<input
							type='checkbox'
							id='smoking'
							value='Smoking'
							name='locationFeatures'
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
							value='Soundengineer'
							id='soundengineerNo'
							name='soundengineer'
						/>
						<label htmlFor='soundengineerNo'>
							No <span className='text-sm'>(Studio only for Rent)</span>
						</label>
					</div>
					<div className='radio-form'>
						<input
							type='radio'
							name='soundengineerPrice'
							id='soundengineerOnrequest'
							value='On Request'
						/>
						<label htmlFor='soundengineerOnrequest'>On Request</label>
					</div>
					<div className='radio-form'>
						<input
							type='radio'
							name='soundengineerPrice'
							id='soundengineerInclusive'
							value='Inclusive'
						/>
						<label htmlFor='soundengineerInclusive'>Inclusive</label>
					</div>
					<div className='radio-form flex items-center'>
						<input
							type='radio'
							name='soundengineerPrice'
							id='SoundengineerPriceCustom'
							value='InputNumber'
						/>
						<label
							className='pr-1'
							htmlFor='SoundengineerPriceCustom'
						>
							Price:
						</label>
						<input
							className='w-12 outline-none'
							type='number'
							name='soundengineerPrice'
							id='soundengineerCustomPriceInput'
						/>
						<label
							htmlFor='soundengineerCustomPriceInput'
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
							name='studioPricingHour'
							id='studioPricingHour'
							value='InputNumber'
						/>
						<label htmlFor='studioPricingHour'>per Hour</label>
						<input
							className='w-16'
							type='number'
							name='studioPricingHour'
							id='studioPricingHour'
						/>
						€
					</div>
					<div className='checkbox-form'>
						<input
							type='checkbox'
							name='studioPricingDay'
							id='studioPricingDay'
							value='InputNumber'
						/>
						<label htmlFor='studioPricingDay'>per Day</label>
						<input
							type='number'
							name='studioPricingDay'
							id='studioPricingDay'
							className='w-16'
						/>
						€
					</div>
					<div className='checkbox-form'>
						<input
							type='checkbox'
							name='studioPricingWeek'
							id='studioPricingWeek'
							value='InputNumber'
						/>
						<label htmlFor='studioPricingWeek'>per Week</label>
						<input
							type='number'
							name='studioPricingWeek'
							id='studioPricingWeek'
							className='w-16'
						/>
						€
					</div>
					<div className='checkbox-form'>
						<input
							type='checkbox'
							name='studioPricingMonth'
							id='studioPricingMonth'
							value='InputNumber'
						/>
						<label htmlFor='studioPricingMonth'>per Month</label>
						<input
							type='number'
							name='studioPricingMonth'
							id='studioPricingMonth'
							className='w-16'
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
						placeholder='Type [City], [Address]'
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

//location
export default FormListings;
