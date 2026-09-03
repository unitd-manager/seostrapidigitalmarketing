type MenuItem = {
  url?: string;
  targetBlank?: boolean;
  label?: string;
};

type FooterData = {
  company_name?: string;
  description?: string;
  location?: string;
  copyright?: string;
  menu_item?: MenuItem[];
};

type FooterProps = {
  data?: FooterData;
};

const Footer = ({ data }: FooterProps) => {
  if (!data) return null;

  return (
    <footer className="border-t border-border py-12">
      <div className="section-container">

        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">

          {/* COMPANY INFO */}
          <div>
            {data.company_name && (
              <div className="mb-3">
                <span className="font-display font-semibold text-foreground">
                  {data.company_name}
                </span>
              </div>
            )}

            {data.description && (
              <p className="text-sm text-muted-foreground mb-1">
                {data.description}
              </p>
            )}

            {data.location && (
              <p className="text-sm text-muted-foreground">
                {data.location}
              </p>
            )}
          </div>

          {/* MENU */}
          {data.menu_item && data.menu_item.length > 0 && (
            <nav className="flex flex-wrap gap-x-6 gap-y-3">
              {data.menu_item.map((item, index) => {
                if (!item.label || !item.url) return null;

                return (
                  <a
                    key={`${item.label}-${index}`}
                    href={item.url}
                    target={item.targetBlank ? "_blank" : "_self"}
                    rel={
                      item.targetBlank
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          )}

        </div>

        {/* COPYRIGHT */}
        {data.copyright && (
          <div className="border-t border-border mt-10 pt-8">
            <p className="text-sm text-muted-foreground">
              {data.copyright}
            </p>
          </div>
        )}

      </div>
    </footer>
  );
};

export default Footer;