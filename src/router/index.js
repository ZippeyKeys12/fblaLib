import Vue from "vue"
import Router from "vue-router"
import Search from "../components/Search"
import AboutPage from "../components/AboutPage"
import CheckedOutItems from "../components/CheckedOutItems"
import ReservedItems from "../components/ReservedItems"
import AccountDetails from "../components/AccountDetails"
import TermsOfService from "../components/TermsOfService"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/search"
    },
    {
      path: "/search",
      name: "search",
      component: Search
    },
    {
      path: "/reserved",
      name: "reservedItems",
      component: ReservedItems
    },
    {
      path: "/checkedOut",
      name: "checkedOutItems",
      component: CheckedOutItems
    },
    {
      path: "/accountDetails",
      name: "accountDetails",
      component: AccountDetails
    },
    {
      path: "/aboutSHSeLib",
      name: "aboutPage",
      component: AboutPage
    },
    {
      path: "/tos",
      name: "termsOfService",
      component: TermsOfService
    }
  ]
})
