export const RegisterLink = () => (
  // TODO: Uncomment the below line to see the effect of top margin on the page.
  // ! Never use mt-x as it caused scroll, instead manage the spacing in the parent component using
  // ! space-y-x and gap-x
  // <div className="mt-6 text-center">
  <p className="text-sm text-gray-600 text-center">
    {/* ! TODO: Remove `{"  "}`, be carful not to add it, use padding instead */}
    Don't Have An Account? {/* ! TODO: Replace text-[#xxxxxx] */}
    <a href="#" className="text-[#5879DC] font-medium">
      Register
    </a>
  </p>
);
