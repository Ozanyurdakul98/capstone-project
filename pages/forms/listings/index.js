import React from 'react';

function FormListings() {
	return (
		<div>
			<h1 className='mt-4 mb-2 text-center text-4xl font-bold leading-tight'>Add Studio Listing</h1>
			<form className='w-full '>
				<fieldset className='w-full'>
					<label
						htmlFor='titel'
						className='label-form block'
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
				<fieldset className='w-full'>
					<legend
						htmlFor='image'
						className=' label-form'
					>
						Mediafiles
					</legend>
					<div className='flex flex-row items-center justify-between md:flex-row '>
						<label
							className='relative flex h-60 w-40 cursor-pointer flex-col items-center justify-center rounded-xl border border-gray-500 bg-white text-black   '
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
						<ul className='w-60 list-disc border-x-2 border-solid border-black p-2 pl-8 text-sm md:absolute md:right-1 lg:right-1/4'>
							<li className='list-none pb-2'>Tips for good photos:</li>
							<li>Different perspectives of the studio setup</li>
							<li>Show your equipment and instruments</li>
							<li>Show sitting areas, awards, kitchen, etc</li>
						</ul>
					</div>
				</fieldset>
				<fieldset className='w-full'>
					<legend className='label-form'>Opening hours</legend>
					<input
						type='radio'
						id='openingHours'
						value='Always available'
						name='openingHours'
					/>
					<label htmlFor='openingHours'>Always available</label>
					<input
						type='radio'
						id='onRequest'
						value='On Request'
						name='openingHours'
					/>
					<label htmlFor='onRequest'>Business hours</label>
				</fieldset>
				<fieldset>
					<legend className='label-form'>Studiotype</legend>
					<button className='border-2 border-black'>
						<p>Premium Studio</p>
						<p>
							Studios with premium equipment, atmospheric rooms and many extras. The studio has many
							years of experience and top references.
							<br />
							The studio is in the upper price segment
						</p>
					</button>
					<button className='border-2 border-black'>
						<p>Medium Studio</p>
						<p>
							Studios with good facilities. You have experience and already have good references.
							<br />
							The studio is in the middle price segment
						</p>
					</button>
					<button className='border-2 border-black'>
						<p>Home Studio</p>
						<p>
							Your equipment serves its purpose. You want to get started and you may already have
							orders for yours Circle of acquaintances or others done.
							<br />
							The studio is in the lower price segment
						</p>
					</button>
				</fieldset>
			</form>
		</div>
	);
}

export default FormListings;
