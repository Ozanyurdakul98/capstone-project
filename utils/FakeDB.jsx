const data = {
	studioListings: [
		{
			user: 'Admin',
			title: 'Premiumstudio für deinen perfekten Sound',
			studioname: 'SoundDeluxe',
			openingOption: 'Benutzerdefiniert',
			openingCustom: {
				monday: '08:00 - 18:00',
				thuesday: '08:00 - 18:00',
				wednesday: '08:00 - 18:00',
				thursday: '08:00 - 18:00',
				friday: '08:00 - 18:00',
				saturday: '08:00 - 18:00',
				sunday: '08:00 - 18:00',
			},
			img: 'https://unsplash.com/photos/uEGX88nVotU/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTR8fHJlY29yZGluZyUyMHN0dWRpb3xlbnwwfHx8fDE2NjU5MjI4MTU&force=true',
			studiotype: 'Premium Studio',
			services: ['Aufnehmen', 'Mischen', 'Mastern', 'Podcast/Hörbuch'],
			recordingEngineer: { preis: '5$', pro: 'Stunde' },
			studioBooking: {
				perHour: '25',
				perDay: '125',
				perWeek: '300',
				perMonth: '1300',
			},

			description:
				' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci, laboriosam dicta. Sed rerum totam delectus suscipit similique voluptatum repellat, maxime iure et modi, quam aliquid iste? Aperiam harum quod cumque quaerat eligendi delectus, fuga iure ut nobis pariatur veniam id et vitae hic quae rerum velit voluptatibus quasi unde sequi.',
			locationFeatures: ['Parkplätze', 'Snacks', 'Wi-Fi', 'WC', 'Küche', 'Übernachtung'],
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
			user: 'User1',
			title: 'Ich mische deine Tracks sehr günstig',
			studioname: 'Sound300',
			openingOption: 'Immer verfügbar',
			img: 'https://unsplash.com/photos/aLPY2rRTYQI/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTF8fG11c2ljJTIwc3R1ZGlvfGVufDB8fHx8MTY2NTg3MzU4Mw&force=true',
			studiotype: 'Home Studio',
			services: ['Mastern', 'Podcast/Hörbuch'],
			recordingEngineer: { preis: '15$', pro: 'Stunde' },
			studioBooking: {
				perHour: '15$',
				perDay: '100$',
			},

			description:
				' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci, laboriosam dicta. Sed rerum totam delectus suscipit similique voluptatum repellat, maxime iure et modi, quam aliquid iste? Aperiam harum quod cumque quaerat eligendi delectus, fuga iure ut nobis pariatur veniam id et vitae hic quae rerum velit voluptatibus quasi unde sequi.',
			locationFeatures: ['Parkplätze', 'Snacks'],
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
			user: 'User2',
			title: 'Premiumstudio für deinen perfekten Sound',
			studioname: 'SoundDeluxe',
			openingOption: 'Benutzerdefiniert',
			openingCustom: {
				monday: '08:00 - 18:00',
				thuesday: '08:00 - 18:00',
				wednesday: '08:00 - 18:00',
				thursday: '08:00 - 18:00',
				friday: '08:00 - 18:00',
				saturday: '08:00 - 18:00',
			},
			img: 'https://unsplash.com/photos/-qFWOJEEQh4/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTZ8fG11c2ljJTIwc3R1ZGlvfGVufDB8fHx8MTY2NTg3MzU4Mw&force=true',
			studiotype: 'Medium Studio',
			services: ['Aufnehmen', 'Mischen', 'Mastern', 'Podcast/Hörbuch'],
			recordingEngineer: { preis: '50', pro: 'Stunde' },
			studioBooking: {
				perHour: '105',
				perDay: '1000',
			},

			description:
				' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci, laboriosam dicta. Sed rerum totam delectus suscipit similique voluptatum repellat, maxime iure et modi, quam aliquid iste? Aperiam harum quod cumque quaerat eligendi delectus, fuga iure ut nobis pariatur veniam id et vitae hic quae rerum velit voluptatibus quasi unde sequi.',
			locationFeatures: ['Parkplätze', 'Snacks', 'Wi-Fi', 'WC', 'Küche', 'Übernachtung'],
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

export default data;
