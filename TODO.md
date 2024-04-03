# TODO

## Features

- Error handling:
   1. The message we prompt the user with when transaction is made or anything else, should be returned from the server not hard coded by the frontend.
   2. The error page that catches errors from anywhere
   3. Prompt users with a good UI to inform them about the response of the server like:
      - log deleted
      - log isn't deleted (or something else)
      - transaction made
      - transaction failed, try again later.
- Maybe read full description (transaction description) on hover or on a click

#### DONE

- Ask user if sure to delete or make transaction. (DONE)
- you have to sign in to get access to the budget website, the users are hard coded. (DONE)
- Display the budget logs in a various ways:
   1. Form oldest to newest and vice versa. (DONE)
   2. From highest transactionAmount to lowest and vice versa. (DONE)
- Authorization:
   1. if the user isn't ADMIN then:
      1. Don't show the transaction button. (DONE)
      2. Don't show the delete log button. (DONE)
- Create your own dialog without using third party. (DONE)

## Styles

- Making sure that the designer is okay with how everything looks

#### DONE

- Transaction form. (DONE)
- Table pagination buttons. (DONE)
- Table state when there are no logs. (DONE)
- Confirmation dialog. (DONE)
- Table with 1 to 9 records don't look right. (DONE)

## Bugs

- You shouldn't be able to access the login page while you're loged in
- The Preform Transaction Button in the form should be disabled until the form is fulfilled

#### DONE

- Amount of money in budget can be "-" a negative value. (DONE)
- Make sure that the authentication is working correctly. (DONE)
- Trim the whitespace from the inputs when login in. (DONE)
- The logs fetching when we change the sorting type is fucked up (Use TanStack Table). (DONE)
