import React from 'react';
import './App.css';
import { useForm } from "react-hook-form";
import TextInput from "./components/TextInput";
import RadioInput from "./components/RadioInput";

function App() {
    const {handleSubmit, formState: {errors, isDirty, isValid}, register, watch} = useForm({mode: 'onChange'});

    const watchPet = watch("favoritePet");

    function handleFormSubmit(data) {
        console.log(data);
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleFormSubmit)}>

                <TextInput
                    label="firstname-field"
                    labelText="Voornaam:"
                    name="firstName"
                    register={register}
                    errors={errors}
                    customValidateParams={{
                        matchPattern: (v) => /^[a-zA-Z]+$/.test(v) || "dit veld mag geen cijfers bevatten",
                        minLength: (v) => v.length >= 2 || "vul een geldige naam in",
                        maxLength: (v) => v.length <= 50 || "het maximale aantal karakters is bereikt",
                    }}
                />
                <TextInput
                    label="lastname-field"
                    labelText="Achternaam:"
                    name="lastName"
                    register={register}
                    errors={errors}
                    customValidateParams={{
                        matchPattern: (v) => /^[a-zA-Z]+$/.test(v) || "dit veld mag geen cijfers bevatten",
                        minLength: (v) => v.length >= 2 || "vul een geldige naam in",
                        maxLength: (v) => v.length <= 60 || "het maximale aantal karakters is bereikt",
                    }}
                />
                <TextInput
                    label="age-field"
                    labelText="Leeftijd:"
                    name="age"
                    register={register}
                    errors={errors}
                    customValidateParams={{
                        matchPattern: (v) => /^[0-9]+$/.test(v) || "dit veld mag geen letters bevatten",
                        min: (v) => v >= 18 || "je moet minimaal 18 jaar oud zijn",
                    }}
                />
                <TextInput
                    label="zipcode-field"
                    labelText="Postcode:"
                    name="zipcode"
                    register={register}
                    errors={errors}
                    customValidateParams={{
                        maxLength: (v) => v['length'] <= 7 || "deze postcode bevat teveel tekens",
                        matchPattern: (v) => /^[1-9][0-9]{3} ?(?!sa|sd|ss|SA|SD|SS)[A-Za-z]{2}$/.test(v) || "dit is geen geldige postcode",
                    }}
                />
                <TextInput
                    label="house-number-field"
                    labelText="Huisnummer:"
                    name="housenumber"
                    register={register}
                    errors={errors}
                    customValidateParams={{
                        matchPattern: (v) => /^[0-9]+$/.test(v) || "dit veld mag geen letters bevatten",
                        min: (v) => v > 0 || "vul een gelding huisnummer in",
                    }}
                />

                <label>
                    Favoriete huisdier:
                </label>

                <RadioInput
                    type="radio"
                    id="cat"
                    name="favoritePet"
                    labelText="Kat"
                    register={register}
                    errors={errors}
                />
                <RadioInput
                    type="radio"
                    id="dog"
                    name="favoritePet"
                    labelText="Hond"
                    register={register}
                    errors={errors}
                />
                <RadioInput
                    type="radio"
                    id="hamster"
                    name="favoritePet"
                    labelText="Hamster"
                    register={register}
                    errors={errors}
                />
                <RadioInput
                    type="radio"
                    id="mouse"
                    name="favoritePet"
                    labelText="Muis"
                    register={register}
                    errors={errors}
                />
                <RadioInput
                    type="radio"
                    id="other"
                    name="favoritePet"
                    labelText="Anders"
                    register={register}
                    errors={errors}
                />


                {watchPet === "other" &&
                    <label htmlFor="otherPet">
                        Specificeer een ander huisdier:
                    </label>
                }
                {watchPet === "other" &&
                    <textarea
                        {...register("otherPet", {
                            validate: {
                                value: (v) => v !== "" || "vul hier uw favoriete huisdier in",
                                matchPattern: (v) => /^[a-zA-Z]+$/.test(v) || "dit veld mag geen cijfers bevatten",
                                minLength: (v) => v['length'] > 2 || "vul een geldig huisdier in"
                            }
                        })}
                        rows="1"
                        cols="50"
                        maxLength="50"
                    >
                </textarea>
                }
                {errors.otherPet && <small>{errors.otherPet.message}</small>}
                <label htmlFor="remarks-textarea">
                    Opmerking:
                </label>
                <textarea
                    {...register("remarks")}
                    rows="5"
                    cols="50"
                    maxLength="250"
                    placeholder="Plaats hier uw aanvullende opmerkingen."
                >
                        </textarea>
                <label htmlFor="conditions-checkbox">
                    <input
                        type="checkbox"
                        id="conditions-checkbox"
                        {...register("conditions", {
                            required: {
                                checked: true,
                                message: 'Dit veld is verplicht',
                            },
                            validate: {
                                checked: (v) => v || "ga akkoord met de algemene voorwaarden om te verzenden",
                            }
                        })}
                    />
                    {errors.zipcode && <small>{errors.zipcode.message}</small>}
                    Akkoord met de algemene voorwaarden.
                </label>
                <button
                    type="submit"
                    id="send-form-button"
                    disabled={!isDirty || !isValid}
                >
                    Verzenden
                </button>
            </form>
        </>
    );
}

export default App;