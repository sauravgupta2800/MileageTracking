import { useEffect, useRef, useState } from "react";

const useDynamicSVGImport = (name, options = {}) => {
  // https://stackoverflow.com/questions/61339259/how-to-dynamically-import-svg-and-render-it-inline
  const ImportedIconRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const { onCompleted, onError } = options;
  useEffect(() => {
    setLoading(true);
    const importIcon = async () => {
      try {
        // ImportedIconRef.current = (
        //   await import(`../../assets/Icons/${name}.svg`)
        // ).ReactComponent;
        // temporary fix : https://github.com/facebook/create-react-app/issues/5276#issuecomment-665628393
        ImportedIconRef.current = (
          await import(
            `!!@svgr/webpack?-svgo,+titleProp,+ref!../../assets/Icons/${name}.svg`
          )
        ).default;

        if (onCompleted) {
          onCompleted(name, ImportedIconRef.current);
        }
      } catch (err) {
        if (onError) {
          onError(err);
        }
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, [name, onCompleted, onError]);

  return { error, loading, SvgIcon: ImportedIconRef.current };
};

export default useDynamicSVGImport;
