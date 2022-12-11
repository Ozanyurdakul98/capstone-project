import { FormInput } from './FormInput';
import Image from 'next/image.js';
import { TbHandClick } from 'react-icons/tb';
import { MdDeleteForever } from 'react-icons/md';
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import CurrencyInput from 'react-currency-input-field';
import { currencyLocales } from '../../helpers/Currencies';
import { formatValue } from 'react-currency-input-field';

export function AddStudioServiceForm(props) {
  return (
    <>
      {/* services */}
      <fieldset className="listingForm  flex flex-col gap-3 ">
        <legend className="label-form mb-0">Studioservice*</legend>
        <p className="label-form mb-0 text-sm font-thin normal-case md:text-base">
          Select the Studioservice you want to create a listing for.
        </p>
        {props.studioService.map((service) => (
          <FormInput
            key={service.id}
            labelWrap={{
              css: props.form.service.includes(service.id) ? 'radio-formActive' : 'radio-form',
            }}
            type="radio"
            name="service"
            value={service.id}
            id={service.name}
            checked={props.form.service.includes(service.id)}
            onChange={(event) => {
              props.handleChange(event);
            }}
            afterLabel={{
              string: service.name,
              css: 'cursor-pointer',
            }}
          />
        ))}
        <span className="errormessage">{props.formErrors.soundengineer}</span>
      </fieldset>
      {/* title */}
      <fieldset className="listingForm ">
        <FormInput
          beforeLabel={{
            string: 'Listingtitle*',
            description: 'Choose a proper title for your Studioservice.',
            css: 'label-form ',
          }}
          className="input-form peer block "
          type="text"
          id="titel"
          counter={{
            val: props.form.listingTitle.length,
            max: 60,
            min: 10,
            css: 'inputCounter',
          }}
          placeholder="Listingtitle here.."
          name="listingTitle"
          required
          autoComplete="off"
          pattern="^([a-zA-Z-])([a-zA-Z-0-9-!äöü,-_\s]){9,60}$"
          errorMessage={'Only 10-60 characters and (a-z, A-Z, 0-9, ! äöü ,-_) allowed!'}
          value={props.form.listingTitle}
          onChange={props.handleChange}></FormInput>
        <span className="errormessage ">{props.formErrors.listingTitle}</span>
      </fieldset>
      {/* profiletext */}
      <fieldset className="listingForm">
        <FormInput
          beforeLabel={{
            string: 'Profiletext',
            css: 'label-form ',
            required: true,
            description:
              'Write what the User should know about this Studioservice. What exactly do you offer? What does the User need to know? Write about References or add some Links to samples.',
          }}
          className="input-form peer block resize-none "
          counter={{
            val: props.form.description.length,
            max: 2500,
            min: 25,
            css: 'inputCounter',
          }}
          textarea={true}
          id="description"
          placeholder="Text about this Studioservice.."
          name="description"
          required
          autoComplete="off"
          pattern="^([a-zA-Z-])([a-zA-Z-0-9-!äöü,-_\s]){24,1499}$"
          errorMessage={'Only 25-350 characters and (a-z, A-Z, 0-9, ! äöü ,-_) allowed!'}
          value={props.form.description}
          onChange={props.handleChange}></FormInput>
        <span className="errormessage ">{props.formErrors.description}</span>
      </fieldset>
      {/* PrimaryImage */}
      <fieldset className="listingForm ">
        <legend htmlFor="image" className=" label-form">
          Titleimage
        </legend>
        <div className="relative flex max-w-[1000px] flex-col items-center justify-between md:flex-row ">
          <div className="relative">
            <label className="flex cursor-pointer justify-center md:block" htmlFor="primary">
              <input
                className="absolute hidden"
                id="primary"
                name="images"
                type="file"
                accept=".gif, .jpg, .jpeg, .jfif, .pjpeg, .pjp, .png, .webp"
                onChange={props.handleChange}
                required
              />
              <div
                className={`relative flex h-56 w-48 flex-col items-center justify-center gap-2 rounded-xl border-2 border-double text-white transition duration-75 ease-out  active:scale-95 sm:h-60 sm:w-48 md:h-60 md:w-56 md:px-2 lg:h-72 lg:w-64 ${
                  props.form.images?.primary || props.checked?.imagesPreview
                    ? 'bg-site border-primary'
                    : 'bg-primary border-white'
                }`}>
                {props.form.images?.primary || props.checked.imagesPreview ? (
                  <>
                    <Image
                      src={
                        props.checked.imagesPreview
                          ? props.checked.imagesPreview
                          : props.form.images.primary
                          ? props.form.images.primary
                          : props.checked.images
                      }
                      layout="fill"
                      alt="Thumbnail"
                      objectFit="contain"
                    />
                  </>
                ) : (
                  <>
                    <p className="text-center text-lg">No picture selected</p>
                    <p className="text-center text-xs lg:text-sm">
                      Accepted file formats: .gif, .jpg, .jpeg, .jfif, .pjpeg, .pjp, .png, .webp
                    </p>
                    <TbHandClick className="h-6 w-6 lg:h-8 lg:w-8" />
                  </>
                )}
              </div>
            </label>
            <p className="pl-2 text-sm md:pl-5">
              {props.checked.imageName ? props.checked.imageName : 'Please select a picture'}
            </p>
            {props.form.images?.primary || props.checked.imagesPreview ? (
              <button type="button" onClick={props.handleDeleteImage} className="absolute top-0 right-6 p-2 lg:right-2">
                <MdDeleteForever className="relative z-20 h-8 w-8 text-red-500 hover:text-red-400" />
              </button>
            ) : null}
          </div>
          <ul className="border-primary text-primary bg-primary h-44 w-60 list-disc rounded-xl border-4 p-2 pl-8 text-sm text-white md:mb-4 md:h-56 md:w-64 md:text-base lg:h-60 lg:w-80 xl:text-lg ">
            <li className="h3 list-none pb-2  text-white">Tips for good photos:</li>
            <li className="font-thin">Different perspectives of the studio setup</li>
            <li className="font-thin">Show your equipment and instruments</li>
            <li className="font-thin">Show sitting areas, awards, kitchen, etc</li>
          </ul>
        </div>
      </fieldset>
      {/* Max-Guests */}
      <fieldset className="listingForm flex flex-col gap-3 ">
        <legend className="label-form">Maximum Guests*</legend>
        <p className="pl-5 text-sm font-thin normal-case md:text-base">
          What is the Capacity of Guests your can handle at once for this Studioservice?
        </p>
        <div className={`StudioserviceFormGuestButtons`}>
          <button
            type="button"
            className="addGuestsStudioservice mr-4 w-6 cursor-pointer disabled:cursor-default lg:w-12 lg:p-1 [&>*]:disabled:scale-100 [&>*]:disabled:opacity-50"
            onClick={props.decrementNumberGuests}
            disabled={props.form.maxGuests === 1}>
            <MinusCircleIcon className="h-full w-full items-center justify-center rounded-sm text-white transition duration-100 active:scale-110 " />
          </button>
          <FormInput
            className="priceInput-form disabled:text-primary h-7 outline-none disabled:bg-white"
            type="number"
            name="maxGuests"
            id="maxGuests"
            disabled
            required
            min={1}
            max={20}
            value={props.form.maxGuests}
            onChange={props.handleChange}
          />
          <button
            type="button"
            className="addGuestsStudioservice ml-4 w-6 cursor-pointer disabled:cursor-default lg:w-12 lg:p-1 [&>*]:disabled:scale-100 [&>*]:disabled:opacity-50"
            onClick={props.incrementNumberGuests}
            disabled={props.form.maxGuests === 20}>
            <PlusCircleIcon className="h-full w-full items-center justify-center rounded-sm text-white transition duration-100 active:scale-110" />
          </button>
        </div>
      </fieldset>
      {/* equipment */}
      <fieldset className="listingForm">
        <FormInput
          beforeLabel={{
            string: 'Equipment*',
            css: 'label-form ',
            description: 'What Equipment is used/available for this Studioservice? List it right here.',
          }}
          className="input-form peer block resize-none "
          counter={{
            val: props.form.equipment.length,
            max: 550,
            min: 10,
            css: 'inputCounter',
          }}
          textarea={true}
          id="equipment"
          placeholder="EquipmentXY, EquipmentXY,.."
          name="equipment"
          required
          autoComplete="off"
          pattern="^([a-zA-Z-])([a-zA-Z-0-9-!äöü,-_\s]){9,349}$"
          errorMessage={'10-350 characters and (a-z, A-Z, 0-9, ! äöü ,-_)!'}
          value={props.form.equipment}
          onChange={props.handleChange}></FormInput>
        <span className="errormessage ">{props.formErrors.equipment}</span>
      </fieldset>
      {/* currency */}
      <fieldset className="listingForm w-full sm:w-2/3 lg:w-1/2">
        <label htmlFor="currency" className="label-form">
          Select your Currency*
        </label>
        <select
          id="currency"
          defaultValue={'1'}
          className=" border-primary form-select m-0 block h-12 w-full appearance-none rounded border border-solid bg-white bg-no-repeat px-2 py-1 text-sm text-gray-700 outline-none focus:bg-white focus:text-gray-700 focus:outline-none focus:ring-0"
          onChange={(event) => {
            const valueArr = event.target.value.split(/[, ]+/);
            const locale = valueArr[0];
            const currency = valueArr[1];
            props.setForm({ ...props.form, subInformations: { locale: locale, currency: currency } });
          }}>
          <option hidden value={'1'}>
            Currency
          </option>
          {currencyLocales.map((config, i) => {
            if (config) {
              const { locale, currency } = config;
              return (
                <option key={i} value={`${locale},${currency}`}>
                  {currency} {locale}
                </option>
              );
            }
          })}
        </select>
      </fieldset>
      {/* Additional Services */}
      <fieldset className="listingForm">
        <div className="bg-primary mb-8 flex w-full flex-col  gap-[2px] rounded-xl  px-5 py-3 text-white sm:w-2/3 lg:w-1/2">
          {/* name and description */}
          <div className="relative">
            <FormInput
              type="text"
              beforeLabel={{
                string: 'Additional Services',
                css: 'label-form text-white',
                description:
                  'Add additional Services and select a pricing option. For example: Food, special Equipment, additional Guests, etc.',
              }}
              id="ServiceName"
              placeholder="Service name.."
              className="input-form peer mb-[4px] block w-full"
              counter={{
                val: props.additionalService.name?.length,
                max: 25,
                min: 2,
                css: 'inputCounter w-full',
              }}
              required
              autoComplete="off"
              pattern="^([a-zA-Z-])([a-zA-Z-0-9-!äöü,-_\s]){1,24}$"
              value={props.additionalService.name}
              onChange={(event) => props.setAdditionalService({ ...props.additionalService, name: event.target.value })}
            />
            <FormInput
              textarea={true}
              className="input-form mb-[3px] block w-full resize-none "
              placeholder="Service description.."
              counter={{
                val: props.additionalService.description?.length,
                max: 200,
                min: 10,
                css: 'inputCounter w-full',
              }}
              required
              autoComplete="off"
              pattern="^([a- zA-Z-])([a-zA-Z-0-9-!äöü,-_\s]){9,199}$"
              value={props.additionalService.description}
              onChange={(event) =>
                props.setAdditionalService({ ...props.additionalService, description: event.target.value })
              }
            />
          </div>
          {/* select and price */}
          <div className="flex gap-[4px]">
            <select
              onChange={(event) =>
                props.setAdditionalService({
                  ...props.additionalService,
                  priceOption: event.target.value,
                })
              }
              value={props.additionalService.priceOption}
              className="form-select m-0 block grow appearance-none rounded border border-solid border-gray-300 bg-white bg-clip-padding bg-no-repeat px-2 py-1 text-sm font-normal text-gray-700 transition ease-in-out   focus:bg-white focus:text-gray-700 focus:outline-none">
              <option hidden value="">
                Price option
              </option>
              <option value="one Time">one Time</option>
              <option value="per Hour">per Hour</option>
              <option value="per Session">per Session</option>
              <option value="per Day">per Day</option>
              <option value="per Week">per Week</option>
              <option value="per Month">per Month</option>
            </select>
            <CurrencyInput
              id="price"
              name="price"
              className="addStudioServiceAdditionalServicesNumber flex-1 "
              placeholder="enter price"
              maxLength={6}
              allowDecimals={false}
              allowNegativeValue={false}
              autoComplete="off"
              value={props.additionalService.price}
              intlConfig={{ locale: props.form.subInformations.locale, currency: props.form.subInformations.currency }}
              onValueChange={(value) => props.setAdditionalService({ ...props.additionalService, price: value })}
            />
          </div>
          {/* button */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => props.handleAdditionalStudioServices()}
              className="form-button hover:bg-secondary-hover text-white">
              Add Serivce
            </button>
            <span className="w-14 text-end text-lg font-semibold leading-loose">0 / 5</span>
          </div>
          {/* errors */}
          <p className="text-sm">{props.formErrors.additionalServices}</p>
        </div>
        <div className="flex w-full flex-col items-center gap-3 sm:w-2/3 lg:w-1/2">
          {props.form.additionalServices.map((service) => (
            <article
              key={service.name}
              className="bg-secondary flex w-full flex-col gap-2 rounded-xl px-5 py-2 text-white  shadow-lg">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <button type="button" onClick={() => props.handleDelete(service.name)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2 h-4 w-4 cursor-pointer rounded-full duration-100 hover:-rotate-12 hover:scale-150 hover:text-red-500">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <p className="pl-5 font-thin">{service.description}</p>
              <section className="mt-4 flex justify-start gap-10 pl-10">
                <p className="font-thin">{service.priceOption}</p>
                <p className=" font-thin">
                  {formatValue({
                    value: service.price,
                    // decimalSeparator: ',',
                    // groupSeparator: '.',
                    intlConfig: {
                      locale: props.form.subInformations.locale,
                      currency: props.form.subInformations.currency,
                    },
                  })}
                </p>
              </section>
            </article>
          ))}
        </div>
      </fieldset>
      {/* Soundengineer */}
      <fieldset className="listingForm flex flex-col gap-3 ">
        <legend className="label-form">Soundengineer</legend>
        <FormInput
          beforeLabel={{
            string:
              'Does this Studioservice include a Soundengineer who is taking care of the session and is the price inclusive? Select no Soundengineer if, for example, you want to rent out your Studio.',
            css: 'pl-5 text-sm font-thin normal-case md:text-base',
          }}
          labelWrap={{
            css: props.form.soundengineer === 'No Soundengineer' ? 'radio-formActive' : 'radio-form',
          }}
          type="radio"
          id="soundengineerNo"
          name="soundengineer"
          value="No Soundengineer"
          checked={props.form.soundengineer === 'No Soundengineer'}
          onChange={(event) => {
            props.handleChange(event);
          }}
          afterLabel={{
            string: 'No Soundengineer ',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: props.form.soundengineer === 'On Request' ? 'radio-formActive' : 'radio-form',
          }}
          type="radio"
          id="soundengineerOnRequest"
          name="soundengineer"
          value="On Request"
          checked={props.form.soundengineer === 'On Request'}
          onChange={(event) => {
            props.handleChange(event);
            props.handleCheck(event);
          }}
          afterLabel={{
            string: 'On Request',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: props.form.soundengineer === 'Inclusive' ? 'radio-formActive' : 'radio-form',
          }}
          type="radio"
          id="soundengineerInclusive"
          name="soundengineer"
          value="Inclusive"
          checked={props.form.soundengineer === 'Inclusive'}
          onChange={(event) => {
            props.handleChange(event);
            props.handleCheck(event);
          }}
          afterLabel={{
            string: 'Inclusive',
            css: 'cursor-pointer',
          }}
        />
        <div className={props.form.soundengineer.soundengineerPrice ? 'radio-formActive' : 'radio-form'}>
          <FormInput
            labelWrap={{
              css: 'cursor-pointer',
              string: 'Price per hour',
            }}
            className="mr-2 "
            type="radio"
            name="soundengineer"
            id="soundengineerPrice"
            checked={props.checked.soundengineer === 'soundengineerPrice'}
            onChange={(event) => {
              props.handleChange(event);
              props.handleCheck(event);
            }}></FormInput>
          <FormInput
            className="priceInput-form peer"
            type="number"
            name="soundengineer"
            id="soundengineerPrice"
            required
            min={1}
            max={9999}
            errorMessage={'From 1 to 9999'}
            disabled={props.checked.soundengineer != 'soundengineerPrice'}
            value={
              props.checked.soundengineer === 'soundengineerPrice' ? props.form.soundengineer.soundengineerPrice : 0
            }
            onChange={(event) => {
              props.handleChange(event);
            }}></FormInput>
        </div>
        <span className="errormessage">{props.formErrors.soundengineer}</span>
      </fieldset>
      {/* studio-price */}
      <fieldset className="listingForm flex flex-col gap-3 ">
        <legend className="label-form">Studio Pricing</legend>
        <div className={props.checked.studioPricing.includes('studioPricingHour') ? 'radio-formActive' : 'radio-form'}>
          <FormInput
            labelWrap={{
              css: 'cursor-pointer',
              string: 'Per hour',
            }}
            type="checkbox"
            className="mr-2"
            name="studioPricing"
            id="studioPricingHour"
            checked={props.checked.studioPricing.includes('studioPricingHour')}
            onChange={(event) => {
              props.handleCheck(event);
            }}
          />
          <FormInput
            className="priceInput-form peer outline-none"
            type="number"
            name="studioPricing"
            id="studioPricingHour"
            required
            min={1}
            max={9999}
            errorMessage={'From 1 to 9999'}
            disabled={!props.checked.studioPricing.includes('studioPricingHour')}
            value={
              !props.checked.studioPricing.includes('studioPricingHour')
                ? 0
                : props.form.studioPricing.studioPricingHour === undefined
                ? ''
                : props.form.studioPricing.studioPricingHour
            }
            onChange={props.handleChange}></FormInput>
        </div>
        <div className={props.checked.studioPricing.includes('studioPricingDay') ? 'radio-formActive' : 'radio-form'}>
          <FormInput
            type="checkbox"
            labelWrap={{
              css: 'cursor-pointer',
              string: 'Per day',
            }}
            className="mr-2"
            name="studioPricing"
            id="studioPricingDay"
            checked={props.checked.studioPricing.includes('studioPricingDay')}
            onChange={(event) => {
              props.handleChange(event);
              props.handleCheck(event);
            }}
          />
          <FormInput
            className="priceInput-form peer"
            type="number"
            name="studioPricing"
            id="studioPricingDay"
            required
            max={9999}
            min={1}
            errorMessage={'From 1 to 9999'}
            disabled={!props.checked.studioPricing.includes('studioPricingDay')}
            value={
              !props.checked.studioPricing.includes('studioPricingDay')
                ? 0
                : props.form.studioPricing.studioPricingDay === undefined
                ? ''
                : props.form.studioPricing.studioPricingDay
            }
            onChange={props.handleChange}
          />
        </div>
        <div className={props.checked.studioPricing.includes('studioPricingWeek') ? 'radio-formActive' : 'radio-form'}>
          <FormInput
            type="checkbox"
            name="studioPricing"
            id="studioPricingWeek"
            className="mr-2"
            checked={props.checked.studioPricing.includes('studioPricingWeek')}
            labelWrap={{
              css: 'cursor-pointer',
              string: 'Per week',
            }}
            onChange={(event) => {
              props.handleCheck(event);
            }}
          />
          <FormInput
            className="priceInput-form peer"
            type="number"
            name="studioPricing"
            id="studioPricingWeek"
            required
            min={1}
            max={9999}
            errorMessage={'From 1 to 9999'}
            disabled={!props.checked.studioPricing.includes('studioPricingWeek')}
            value={
              !props.checked.studioPricing.includes('studioPricingWeek')
                ? 0
                : props.form.studioPricing.studioPricingWeek === undefined
                ? ''
                : props.form.studioPricing.studioPricingWeek
            }
            onChange={props.handleChange}
          />
        </div>
        <div className={props.checked.studioPricing.includes('studioPricingMonth') ? 'radio-formActive' : 'radio-form'}>
          <FormInput
            type="checkbox"
            name="studioPricing"
            id="studioPricingMonth"
            className="mr-2"
            checked={props.checked.studioPricing.includes('studioPricingMonth')}
            labelWrap={{
              css: 'cursor-pointer',
              string: 'Per month',
            }}
            onChange={(event) => {
              props.handleCheck(event);
            }}
          />
          <FormInput
            className="priceInput-form peer "
            type="number"
            name="studioPricing"
            id="studioPricingMonth"
            required
            errorMessage={'From 1 to 9999'}
            min={1}
            max={9999}
            disabled={!props.checked.studioPricing.includes('studioPricingMonth')}
            value={
              !props.checked.studioPricing.includes('studioPricingMonth')
                ? 0
                : props.form.studioPricing.studioPricingMonth === undefined
                ? ''
                : props.form.studioPricing.studioPricingMonth
            }
            onChange={props.handleChange}
          />
        </div>
        <span className="errormessage">{props.formErrors.studioPricing}</span>
      </fieldset>
      {/* location */}
      <fieldset className="listingForm mb-52">
        <FormInput
          beforeLabel={{
            string: 'Location',
            css: 'label-form ',
          }}
          className="input-form peer"
          type="text"
          name="studioLocation"
          placeholder="Type [City], [Address]"
          required
          autoComplete="off"
          errorMessage={'Only 5-60 characters and (a-z, A-Z, 0-9, äöü ,-) allowed!'}
          pattern="^([a-zA-Z-])([a-zA-Z-0-9-,äöü\s]){4,60}$"
          value={props.form.studioLocation}
          onChange={props.handleChange}
        />
        <span className="errormessage">{props.formErrors.studioLocation}</span>
      </fieldset>
      {/* Errormessage */}
      <fieldset>
        {props.length !== 0 ? <p className="errormessage text-end">Please resolve your errors first!</p> : null}
      </fieldset>
    </>
  );
}
