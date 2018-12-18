import React, { PureComponent } from "react"
import { ApolloConsumer, QueryResult } from "react-apollo"
import { ApolloClient } from "apollo-boost"
import gql from "graphql-tag"
import AutoSuggest from "react-autosuggest"

import styles from "./AutoComplete.scss"

const tagQuery = gql`
  query Tag($query: String!) {
    getTags(query: $query) {
      name
      id
    }
  }
`

interface Props {
  onSelect: any
}

interface State {
  value: string
  suggestions: string[]
}

class AutoComplete extends PureComponent<Props, State> {
  public state = { value: "", suggestions: [] }

  public onChange = (event: any, { newValue }: any) => {
    this.setState({
      value: newValue
    })
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
      .then(({ data }: any) => {
        this.setState({ suggestions: data.getTags })
      })
      .catch(err => console.log("Error", err))
  }
  public onSuggestionsClearRequested = () => {
    console.log("onSuggestionsClearRequested")
    this.setState({ value: "", suggestions: [] })
  }
  public onSuggestionSelected = (e: any, { suggestion }: any) => {
    console.log("onSuggestionSelected")
    this.props.onSelect(suggestion)
  }

  public getSuggestionValue = (suggestion: any) => suggestion.name

  public renderSuggestion = (suggestion: any) => <div>{suggestion.name}</div>

  public render() {
    const { value, suggestions } = this.state
    const inputProps = {
      placeholder: "Type a programming language",
      value,
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
            theme={{ input: styles.input }}
          />
        )}
      </ApolloConsumer>
    )
  }
}

export default AutoComplete

// NEEDED PROPS:
// Add tag to form tags array

// TODO: Suggestion type  => TagType
