import React, { PureComponent } from "react"
import { ApolloConsumer } from "react-apollo"
import { ApolloClient, ApolloQueryResult } from "apollo-boost"
import gql from "graphql-tag"
import AutoSuggest, {
  ChangeEvent,
  SuggestionSelectedEventData
} from "react-autosuggest"

import styles from "./FormTagField.scss"
import { TagData } from "../../types"

const tagQuery = gql`
  query Tag($query: String!) {
    getTags(query: $query) {
      name
      id
    }
  }
`

interface Props {
  fieldName: string
  onSelect: (suggestion: TagData) => void
  setTouched: (field: string) => void
}

interface State {
  value: string
  suggestions: TagData[]
}

class AutoComplete extends PureComponent<Props, State> {
  public state = { value: "", suggestions: [] }

  public onChange = (e: React.FormEvent<any>, { newValue }: ChangeEvent) => {
    this.setState({
      value: newValue
    })
  }

  public onBlur = (e: React.FormEvent<any>) => {
    this.props.setTouched(this.props.fieldName)
  }

  public onSuggestionsFetchRequested = (client: ApolloClient<any>) => ({
    value
  }: {
    value: string
  }) => {
    client
      .query({
        query: tagQuery,
        variables: { query: value }
      })
      .then(({ data }: ApolloQueryResult<any>) => {
        this.setState({ suggestions: data.getTags })
      })
  }

  public onSuggestionsClearRequested = () => {
    this.setState({ value: "", suggestions: [] })
  }

  public onSuggestionSelected = (
    e: React.FormEvent<any>,
    { suggestion }: SuggestionSelectedEventData<any>
  ) => {
    e.preventDefault()
    this.props.onSelect(suggestion)
  }

  public getSuggestionValue = (suggestion: TagData) => suggestion.name

  public renderSuggestion = (suggestion: TagData) => (
    <div className={styles.suggestionName}>
      &#35;
      {suggestion.name}
    </div>
  )

  public render() {
    const { value, suggestions } = this.state

    const inputProps = {
      placeholder: "Select at least a tag",
      value,
      onBlur: this.onBlur,
      onChange: this.onChange,
      autoCorrect: "off",
      autoCapitalize: "off",
      autoComplete: "off"
    }

    return (
      <ApolloConsumer>
        {(client: ApolloClient<any>) => (
          <AutoSuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested(
              client
            )}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            onSuggestionSelected={this.onSuggestionSelected}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
            theme={{
              input: styles.input,
              container: styles.autoCompleteContainer,
              suggestionsContainerOpen: styles.suggestionsContainerOpen,
              suggestionsList: styles.suggestionsList,
              suggestion: styles.suggestion,
              suggestionHighlighted: styles.suggestionHighlighted
            }}
          />
        )}
      </ApolloConsumer>
    )
  }
}

export default AutoComplete
