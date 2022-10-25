import { nanoid } from 'nanoid';
const fakeData = {
	studioListings: [
		{
			_id: `${nanoid()}`,
			user: 'Admin',
			title: 'Premiumstudio for your perfect Sound',
			studioname: 'SoundDeluxe',
			openingOption: 'Custom',
			openingCustom: {
				thuesday: '08:00 - 18:00',
				wednesday: '08:00 - 18:00',
				thursday: '08:00 - 18:00',
				friday: '08:00 - 18:00',
				saturday: '08:00 - 18:00',
				sunday: '08:00 - 18:00',
			},
			img: 'https://unsplash.com/photos/uEGX88nVotU/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTR8fHJlY29yZGluZyUyMHN0dWRpb3xlbnwwfHx8fDE2NjU5MjI4MTU&force=true',
			studiotype: 'Premiumstudio',
			services: ['Recording', 'Mix', 'Master', 'Podcast & Audiobook', 'Rent Studio'],
			maxGuests: 14,
			soundEngineerAvailabilty: { available: true },
			soundEngineer: { preis: '5', pro: 'Stunde' },
			studioBooking: {
				perHour: '25',
				perDay: '125',
				perWeek: '300',
				perMonth: '1300',
			},

			description:
				' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci, laboriosam dicta. Sed rerum totam delectus suscipit similique voluptatum repellat, maxime iure et modi, quam aliquid iste? Aperiam harum quod cumque quaerat eligendi delectus, fuga iure ut nobis pariatur veniam id et vitae hic quae rerum velit voluptatibus quasi unde sequi.',
			locationFeatures: {
				parking: true,
				snacks: true,
				wifi: true,
				wc: true,
				kitchen: true,
				sleepover: true,
				smoking: true,
			},
			equipment: [
				'equipment1',
				'equipment31',
				'equipment431',
				'equipment12',
				'equipment123',
				'equipment31',
			],
			references:
				' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci, laboriosam dicta. Sed rerum totam delectus suscipit similique voluptatum repellat, maxime iure et modi, quam aliquid iste? Aperiam harum quod cumque quaerat eligendi delectus, fuga iure ut nobis pariatur veniam id et vitae hic quae rerum velit voluptatibus quasi unde sequi.',
			socialMedia: {
				facebook: 'facebookURL',
				twitter: 'TwitterURL',
				spotify: 'SpotifyURL',
			},
			location: 'Frankfurt am Main, Geht-der-Hase str.32',
		},

		{
			_id: `${nanoid()}`,
			user: 'User1',
			title: 'I mix your tracks to perfection for a little price',
			studioname: 'Sound300',
			openingOption: 'Always Available',
			img: 'https://unsplash.com/photos/aLPY2rRTYQI/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTF8fG11c2ljJTIwc3R1ZGlvfGVufDB8fHx8MTY2NTg3MzU4Mw&force=true',
			studiotype: 'Home Studio',
			services: ['Recording', 'Podcast & Audiobook'],
			maxGuests: 2,

			soundEngineerAvailabilty: { available: true },

			soundEngineer: { preis: '15', pro: 'Stunde' },
			studioBooking: {
				perHour: '15',
				perDay: '100',
			},

			description:
				' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci, laboriosam dicta. Sed rerum totam delectus suscipit similique voluptatum repellat, maxime iure et modi, quam aliquid iste? Aperiam harum quod cumque quaerat eligendi delectus, fuga iure ut nobis pariatur veniam id et vitae hic quae rerum velit voluptatibus quasi unde sequi.',
			locationFeatures: {
				parking: true,
				snacks: true,
				wifi: true,
				wc: true,
				kitchen: true,
				sleepover: true,
				smoking: true,
			},
			equipment: [
				'equipment1',
				'equipment31',
				'equipment431',
				'equipment12',
				'equipment123',
				'equipment31',
			],
			references:
				' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci, laboriosam dicta. Sed rerum totam delectus suscipit similique voluptatum repellat, maxime iure et modi, quam aliquid iste? Aperiam harum quod cumque quaerat eligendi delectus, fuga iure ut nobis pariatur veniam id et vitae hic quae rerum velit voluptatibus quasi unde sequi.',
			socialMedia: {
				facebook: 'facebookURL',
				twitter: 'TwitterURL',
				spotify: 'SpotifyURL',
			},

			location: 'Frankfurt am Main, Geht-der-Hase str.32',
		},

		{
			_id: `${nanoid()}`,
			user: 'User2',
			title: 'Mediumstudio to fit your needs',
			studioname: 'SoundDeluxe',
			openingOption: 'Custom',
			openingCustom: {
				monday: '08:00 - 18:00',
				thuesday: '08:00 - 18:00',
				wednesday: '08:00 - 18:00',
				thursday: '08:00 - 18:00',
				friday: '08:00 - 18:00',
				saturday: '08:00 - 18:00',
			},
			img: 'https://unsplash.com/photos/-qFWOJEEQh4/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTZ8fG11c2ljJTIwc3R1ZGlvfGVufDB8fHx8MTY2NTg3MzU4Mw&force=true',
			studiotype: 'Mediumstudio',
			services: ['Recording', 'Mix', 'Master', 'Podcast & Audiobook', 'Rent Studio'],
			maxGuests: 3,

			soundEngineerAvailabilty: { available: false },
			studioBooking: {
				perHour: '105',
				perDay: '1000',
			},

			description:
				' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci, laboriosam dicta. Sed rerum totam delectus suscipit similique voluptatum repellat, maxime iure et modi, quam aliquid iste? Aperiam harum quod cumque quaerat eligendi delectus, fuga iure ut nobis pariatur veniam id et vitae hic quae rerum velit voluptatibus quasi unde sequi.',
			locationFeatures: {
				parking: true,
				snacks: true,
				wifi: true,
				wc: true,
				kitchen: true,
				sleepover: true,
				smoking: true,
			},
			equipment: [
				'equipment1',
				'equipment31',
				'equipment431',
				'equipment12',
				'equipment123',
				'equipment31',
			],
			references:
				' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci, laboriosam dicta. Sed rerum totam delectus suscipit similique voluptatum repellat, maxime iure et modi, quam aliquid iste? Aperiam harum quod cumque quaerat eligendi delectus, fuga iure ut nobis pariatur veniam id et vitae hic quae rerum velit voluptatibus quasi unde sequi.',
			socialMedia: {
				facebook: 'facebookURL',
				twitter: 'TwitterURL',
				spotify: 'SpotifyURL',
			},
			location: 'Hamburg, Geht-der-Hase str.3',
		},
	],
};
export { fakeData };
