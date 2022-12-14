import { FormInput } from '../FormInput';
import Image from 'next/image.js';
import { TbHandClick } from 'react-icons/tb';
import { MdDeleteForever } from 'react-icons/md';
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import CurrencyInput from 'react-currency-input-field';
import { currencyLocales } from '../../../helpers/Currencies';
import { formatValue } from 'react-currency-input-field';

export function StudioServiceFormfields(props) {
  return (
    <>
      {/* Seperator */}
      <div className="h2 border-primary w-full border-b-2">Main informations</div>
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
        <span className="errormessage">{props.formErrors.service}</span>
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
          pattern="^([a-zA-Z-])([a-zA-Z-0-9-!??????,-_\s]){9,60}$"
          errorMessage={'Only 10-60 characters and (a-z, A-Z, 0-9, ! ?????? ,-_) allowed!'}
          value={props.form.listingTitle}
          onChange={props.handleChange}></FormInput>
        <span className="errormessage ">{props.formErrors.listingTitle}</span>
      </fieldset>
      {/* description */}
      <fieldset className="listingForm">
        <FormInput
          beforeLabel={{
            string: 'Description',
            css: 'label-form ',
            required: true,
            description:
              'Write what the User should know about this Studioservice. What exactly do you offer? What does the User need to know? Write about References or add some Links to samples.',
          }}
          className="input-form peer block resize-none "
          counter={{
            val: props.form.description.length,
            max: 2500,
            min: 100,
            css: 'inputCounter',
          }}
          textarea={true}
          id="description"
          placeholder="Text about this Studioservice.."
          name="description"
          required
          autoComplete="off"
          pattern="^([a-zA-Z-])([a-zA-Z-0-9-!??????,-_\s]){24,1499}$"
          errorMessage={'100-2500, and (a-z, A-Z, 0-9, ! ?????? ,-_) allowed!'}
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
                {props.form.images?.primary || props.checked?.imagesPreview ? (
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
              {props.checked?.imageName ? props.checked?.imageName : 'Please select a picture'}
            </p>
            {props.form.images?.primary || props.checked?.imagesPreview ? (
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
            simple={true}
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
          pattern="^([a-zA-Z-])([a-zA-Z-0-9-!??????,-_\s]){9,349}$"
          errorMessage={'10-350 characters and (a-z, A-Z, 0-9, ! ?????? ,-_)!'}
          value={props.form.equipment}
          onChange={props.handleChange}></FormInput>
        <span className="errormessage ">{props.formErrors.equipment}</span>
      </fieldset>
      {/* Seperator */}
      <div className="h2 border-primary mt-20 w-full border-b-2">Pricing</div>
      {/* currency */}
      <fieldset className="listingForm w-full sm:w-2/3 lg:w-1/2">
        <label htmlFor="currency" className="label-form block">
          Select your Currency*
          <p className="text-sm font-normal normal-case">Select your currency for all pricings of this Studioservice</p>
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
                  'Add additional Services which are optional for the User and select a pricing option for them. For example: Food, special Equipment, additional Guests, etc.',
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
              pattern="^([a-zA-Z-])([a-zA-Z-0-9-!??????,-_\s]){1,24}$"
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
              pattern="^([a- zA-Z-])([a-zA-Z-0-9-!??????,-_\s]){9,199}$"
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
              maxLength={6}
              allowDecimals={false}
              allowNegativeValue={false}
              autoComplete="off"
              value={props.additionalService.price || 0}
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
            <span
              className={`w-14 text-end text-lg font-semibold leading-loose ${
                props.form.additionalServices.length >= 5 ? 'text-red-500 ' : 'text-white'
              }`}>
              {props.form.additionalServices.length} / 5
            </span>
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
              'Does this Studioservice include a Soundengineer who is taking care of the session and is the price for this service inclusive or not? Select no Soundengineer if, for example, you want to rent out your Studio.',
            css: 'pl-5 text-sm font-thin normal-case md:text-base',
          }}
          labelWrap={{
            css: props.checked.soundengineer === 'soundengineerNo' ? 'radio-formActive' : 'radio-form',
          }}
          type="radio"
          id="soundengineerNo"
          name="soundengineer"
          value="No Soundengineer"
          checked={props.checked.soundengineer === 'soundengineerNo'}
          onChange={(event) => {
            props.handleChange(event);
            props.handleCheck(event);
          }}
          afterLabel={{
            string: 'No Soundengineer ',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: props.checked.soundengineer === 'soundengineerOnRequest' ? 'radio-formActive' : 'radio-form',
          }}
          type="radio"
          id="soundengineerOnRequest"
          name="soundengineer"
          value="On Request"
          checked={props.checked.soundengineer === 'soundengineerOnRequest'}
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
            css: props.checked.soundengineer === 'soundengineerInclusive' ? 'radio-formActive' : 'radio-form',
          }}
          type="radio"
          id="soundengineerInclusive"
          name="soundengineer"
          value="Inclusive"
          checked={props.checked.soundengineer === 'soundengineerInclusive'}
          onChange={(event) => {
            props.handleChange(event);
            props.handleCheck(event);
          }}
          afterLabel={{
            string: 'Inclusive',
            css: 'cursor-pointer',
          }}
        />
        <label
          htmlFor={`${props.checked.soundengineer === 'soundengineerPrice' ? '' : 'soundengineerPrice'}`}
          className={`gap-0 active:scale-100 ${
            props.checked.soundengineer === 'soundengineerPrice' ? 'radio-formActive' : 'radio-form'
          }`}>
          <input
            type="radio"
            className="mr-2"
            name="soundengineer"
            id="soundengineerPrice"
            checked={props.checked.soundengineer === 'soundengineerPrice'}
            onChange={(event) => {
              props.handleCheck(event);
              props.setForm({ ...props.form, soundengineer: '' });
            }}
          />
          <select
            disabled={props.checked.soundengineer != 'soundengineerPrice'}
            onChange={(event) =>
              props.setForm({
                ...props.form,
                soundengineer: { ...props.form.soundengineer, priceOption: event.target.value },
              })
            }
            value={props.form.soundengineer.priceOption || ''}
            className="form-select m-0 mr-2 block h-[22px] w-32 appearance-none rounded border border-solid border-gray-300 bg-white  px-2 py-0 text-sm font-normal text-gray-700  focus:bg-white focus:text-gray-700 focus:outline-none">
            <option hidden value="">
              Price option
            </option>
            <option value="one Time">one Time</option>
            <option value="per Hour">per Hour</option>
            <option value="per Session">per Session</option>
          </select>
          <CurrencyInput
            id="price"
            name="soundengineer"
            className="priceInput-form mr-2 w-14"
            maxLength={6}
            required
            disabled={props.checked.soundengineer != 'soundengineerPrice'}
            allowDecimals={false}
            allowNegativeValue={false}
            autoComplete="off"
            value={props.form.soundengineer.price || 0}
            intlConfig={{ locale: props.form.subInformations.locale, currency: props.form.subInformations.currency }}
            onValueChange={(value, name) => props.handleChange(value, name)}
          />
        </label>
        <span className="errormessage">{props.formErrors.soundengineer}</span>
      </fieldset>
      {/* service-price */}
      <fieldset className="listingForm flex flex-col gap-3 ">
        <legend className="label-form">Studioservice Pricing</legend>
        <p className="pl-5 text-sm">
          Check the Pricing-options you want to make available for this Studioservice. If your weekend prices differs,
          you can set a different price for it.
        </p>
        <label
          htmlFor="pricingHour"
          className={props.checked.pricing.includes('pricingHour') ? 'radio-formActive' : 'radio-form'}>
          <FormInput
            labelWrap={{
              css: 'cursor-pointer',
              string: 'per Hour',
            }}
            type="checkbox"
            className="mr-2"
            name="pricing"
            id="pricingHour"
            checked={props.checked.pricing.includes('pricingHour')}
            onChange={(event) => {
              props.handleCheck(event);
            }}
          />
          <CurrencyInput
            name="pricing"
            id="pricingHour"
            className="priceInput-form mr-2 w-14"
            placeholder="price"
            maxLength={6}
            required
            disabled={!props.checked.pricing.includes('pricingHour')}
            allowDecimals={false}
            allowNegativeValue={false}
            autoComplete="off"
            value={props.form.pricing.pricingHour || 0}
            intlConfig={{ locale: props.form.subInformations.locale, currency: props.form.subInformations.currency }}
            onValueChange={(value, name) =>
              props.setForm({ ...props.form, [name]: { ...props.form.pricing, pricingHour: value } })
            }
          />
        </label>
        <label
          htmlFor="pricingDay"
          className={props.checked.pricing.includes('pricingDay') ? 'radio-formActive' : 'radio-form'}>
          <FormInput
            type="checkbox"
            labelWrap={{
              css: 'cursor-pointer',
              string: 'per Day',
            }}
            className="mr-2"
            name="pricing"
            id="pricingDay"
            checked={props.checked.pricing.includes('pricingDay')}
            onChange={(event) => {
              props.handleCheck(event);
            }}
          />
          <CurrencyInput
            name="pricing"
            id="pricingDay"
            className="priceInput-form mr-2 w-14"
            placeholder="price"
            maxLength={6}
            required
            disabled={!props.checked.pricing.includes('pricingDay')}
            allowDecimals={false}
            allowNegativeValue={false}
            autoComplete="off"
            value={props.form.pricing.pricingDay || 0}
            intlConfig={{ locale: props.form.subInformations.locale, currency: props.form.subInformations.currency }}
            onValueChange={(value, name) =>
              props.setForm({ ...props.form, [name]: { ...props.form.pricing, pricingDay: value } })
            }
          />
        </label>
        {/* weekend */}
        <label
          htmlFor="pricingWeekend"
          className={props.checked.pricing.includes('pricingWeekend') ? 'radio-formActive' : 'radio-form'}>
          <FormInput
            type="checkbox"
            name="pricing"
            id="pricingWeekend"
            className="mr-2"
            checked={props.checked.pricing.includes('pricingWeekend')}
            labelWrap={{
              css: 'cursor-pointer',
              string: 'on Weekend',
            }}
            onChange={(event) => {
              props.handleCheck(event);
            }}
          />
          <CurrencyInput
            name="pricing"
            id="pricingWeekend"
            className="priceInput-form mr-2 w-14"
            placeholder="price"
            maxLength={6}
            required
            disabled={!props.checked.pricing.includes('pricingWeekend')}
            allowDecimals={false}
            allowNegativeValue={false}
            autoComplete="off"
            value={props.form.pricing.pricingWeekend || 0}
            intlConfig={{ locale: props.form.subInformations.locale, currency: props.form.subInformations.currency }}
            onValueChange={(value, name) =>
              props.setForm({ ...props.form, [name]: { ...props.form.pricing, pricingWeekend: value } })
            }
          />
        </label>
        {/* week */}
        <label
          htmlFor="pricingWeek"
          className={props.checked.pricing.includes('pricingWeek') ? 'radio-formActive' : 'radio-form'}>
          <FormInput
            type="checkbox"
            name="pricing"
            id="pricingWeek"
            className="mr-2"
            checked={props.checked.pricing.includes('pricingWeek')}
            labelWrap={{
              css: 'cursor-pointer',
              string: 'per Week',
            }}
            onChange={(event) => {
              props.handleCheck(event);
            }}
          />
          <CurrencyInput
            name="pricing"
            id="pricingWeek"
            className="priceInput-form mr-2 w-14"
            placeholder="price"
            maxLength={6}
            required
            disabled={!props.checked.pricing.includes('pricingWeek')}
            allowDecimals={false}
            allowNegativeValue={false}
            autoComplete="off"
            value={props.form.pricing.pricingWeek || 0}
            intlConfig={{ locale: props.form.subInformations.locale, currency: props.form.subInformations.currency }}
            onValueChange={(value, name) =>
              props.setForm({ ...props.form, [name]: { ...props.form.pricing, pricingWeek: value } })
            }
          />
        </label>
        {/* Month */}
        <label
          htmlFor="pricingMonth"
          className={props.checked.pricing.includes('pricingMonth') ? 'radio-formActive' : 'radio-form'}>
          <FormInput
            type="checkbox"
            name="pricing"
            id="pricingMonth"
            className="mr-2"
            checked={props.checked.pricing.includes('pricingMonth')}
            labelWrap={{
              css: 'cursor-pointer',
              string: 'per Month',
            }}
            onChange={(event) => {
              props.handleCheck(event);
            }}
          />
          <CurrencyInput
            name="pricing"
            id="pricingMonth"
            className="priceInput-form mr-2 w-14"
            placeholder="price"
            maxLength={6}
            required
            disabled={!props.checked.pricing.includes('pricingMonth')}
            allowDecimals={false}
            allowNegativeValue={false}
            autoComplete="off"
            value={props.form.pricing.pricingMonth || 0}
            intlConfig={{ locale: props.form.subInformations.locale, currency: props.form.subInformations.currency }}
            onValueChange={(value, name) =>
              props.setForm({ ...props.form, [name]: { ...props.form.pricing, pricingMonth: value } })
            }
          />
        </label>
        {/* Deposit */}
        <label
          htmlFor="pricingDeposit"
          className={props.checked.pricing.includes('pricingDeposit') ? 'radio-formActive' : 'radio-form'}>
          <FormInput
            type="checkbox"
            name="pricing"
            id="pricingDeposit"
            className="mr-2"
            checked={props.checked.pricing.includes('pricingDeposit')}
            labelWrap={{
              css: 'cursor-pointer',
              string: 'Deposit',
            }}
            onChange={(event) => {
              props.handleCheck(event);
            }}
          />
          <CurrencyInput
            name="pricing"
            id="pricingDeposit"
            className="priceInput-form mr-2 w-14"
            placeholder="price"
            maxLength={6}
            required
            disabled={!props.checked.pricing.includes('pricingDeposit')}
            allowDecimals={false}
            allowNegativeValue={false}
            autoComplete="off"
            value={props.form.pricing.pricingDeposit || 0}
            intlConfig={{ locale: props.form.subInformations.locale, currency: props.form.subInformations.currency }}
            onValueChange={(value, name) =>
              props.setForm({ ...props.form, [name]: { ...props.form.pricing, pricingDeposit: value } })
            }
          />
        </label>
        <span className="errormessage">{props.formErrors.pricing}</span>
      </fieldset>
      {/* Errormessage */}
      <fieldset>
        {props.length !== 0 ? <p className="errormessage text-end">Please resolve your errors first!</p> : null}
      </fieldset>
    </>
  );
}
