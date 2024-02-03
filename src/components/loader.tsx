const Loader = () => (
  <div className="grid h-screen place-items-center bg-cover">
    <div className="inline-block animate-pulse" role="status">
      <div>
        {/* <Image
          src={lightModeLogo}
          alt={`vieweather-light-mode-logo`}
          height={64}
          width={64}
          className="h-16 w-16 dark:hidden"
        />
        <Image
          src={darkModeLogo}
          alt={`vieweather-dark-mode-logo`}
          height={64}
          width={64}
          className="hidden h-16 w-16 dark:block"
        /> */}
      </div>
    </div>
  </div>
);

export default Loader;
